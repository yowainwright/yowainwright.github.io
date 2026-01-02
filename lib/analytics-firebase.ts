import { ref, get, set, onValue, off } from 'firebase/database';
import { db } from './firebase';

export interface AnalyticsData {
  slug: string;
  views: number;
  shares: number;
  comments: number;
  loves: number;
}

const EMPTY_ANALYTICS: Omit<AnalyticsData, 'slug'> = {
  views: 0,
  shares: 0,
  comments: 0,
  loves: 0,
};

function createAnalyticsData(slug: string, data?: Record<string, number>): AnalyticsData {
  if (!data) {
    return { slug, ...EMPTY_ANALYTICS };
  }
  return {
    slug,
    views: data.views ?? 0,
    shares: data.shares ?? 0,
    comments: data.comments ?? 0,
    loves: data.loves ?? 0,
  };
}

function sanitizeSlug(slug: string): string {
  return slug.replace(/\//g, '_');
}

function getAnalyticsRef(slug: string, metric: string) {
  if (!db) return null;
  return ref(db, `analytics/${sanitizeSlug(slug)}/${metric}`);
}

async function incrementMetric(slug: string, metric: string): Promise<void> {
  const metricRef = getAnalyticsRef(slug, metric);
  if (!metricRef) return;

  try {
    const snapshot = await get(metricRef);
    const currentCount = snapshot.val() ?? 0;
    await set(metricRef, currentCount + 1);
  } catch (error) {
    console.error(`Failed to increment ${metric} for ${slug}:`, error);
  }
}

export async function trackView(slug: string): Promise<void> {
  const sessionKey = `viewed-${slug}`;
  const hasViewed = sessionStorage.getItem(sessionKey) === 'true';
  if (hasViewed) return;

  await incrementMetric(slug, 'views');
  sessionStorage.setItem(sessionKey, 'true');
}

export async function trackShare(slug: string): Promise<void> {
  await incrementMetric(slug, 'shares');
}

export async function trackComment(slug: string): Promise<void> {
  const sessionKey = `commented-${slug}`;
  const hasCommented = sessionStorage.getItem(sessionKey) === 'true';
  if (hasCommented) return;

  await incrementMetric(slug, 'comments');
  sessionStorage.setItem(sessionKey, 'true');
}

export async function trackLove(slug: string): Promise<void> {
  await incrementMetric(slug, 'loves');
}

export async function getAnalytics(slug: string): Promise<AnalyticsData> {
  if (!db) {
    return createAnalyticsData(slug);
  }

  try {
    const sanitized = sanitizeSlug(slug);
    const analyticsRef = ref(db, `analytics/${sanitized}`);
    const snapshot = await get(analyticsRef);
    return createAnalyticsData(slug, snapshot.val());
  } catch (error) {
    console.error(`Failed to get analytics for ${slug}:`, error);
    return createAnalyticsData(slug);
  }
}

export function subscribeToAllAnalytics(
  callback: (data: Record<string, AnalyticsData>) => void
): () => void {
  if (!db) {
    callback({});
    return () => {};
  }

  const analyticsRef = ref(db, 'analytics');

  onValue(analyticsRef, (snapshot) => {
    const rawData = snapshot.val() ?? {};
    const result: Record<string, AnalyticsData> = {};

    for (const [sanitizedSlug, metrics] of Object.entries(rawData)) {
      const slug = sanitizedSlug.replace(/_/g, '/');
      result[slug] = createAnalyticsData(slug, metrics as Record<string, number>);
    }

    callback(result);
  });

  return () => off(analyticsRef);
}

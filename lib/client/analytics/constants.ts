import type { AnalyticsData } from "./types";

export const EMPTY_ANALYTICS: Omit<AnalyticsData, "slug"> = {
  views: 0,
  shares: 0,
  comments: 0,
  loves: 0,
};

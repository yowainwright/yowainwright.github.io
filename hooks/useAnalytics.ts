import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const GA_ID = "G-5BH1F8XBX5";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

export function usePageViews() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window === "undefined" || !window.gtag) return;
      window.gtag("config", GA_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}

export function useScrollDepth() {
  const maxDepth = useRef(0);
  const milestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxDepth.current) {
        maxDepth.current = scrollPercent;

        [25, 50, 75, 90, 100].forEach((milestone) => {
          if (scrollPercent >= milestone && !milestones.current.has(milestone)) {
            milestones.current.add(milestone);
            trackEvent("scroll_depth", "engagement", `${milestone}%`, milestone);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    maxDepth.current = 0;
    milestones.current = new Set();
  }, []);
}

export function useReadTime(wordCount: number) {
  const startTime = useRef<number>(Date.now());
  const tracked = useRef(false);

  const estimatedReadTime = Math.ceil(wordCount / 200);

  useEffect(() => {
    startTime.current = Date.now();
    tracked.current = false;

    return () => {
      if (tracked.current) return;
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      const percentRead = Math.min(100, Math.round((timeSpent / (estimatedReadTime * 60)) * 100));

      trackEvent("read_time", "engagement", `${timeSpent}s`, timeSpent);
      trackEvent("read_completion", "engagement", `${percentRead}%`, percentRead);
      tracked.current = true;
    };
  }, [estimatedReadTime]);

  return estimatedReadTime;
}

export function useExternalLinks() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const isExternal = href.startsWith("http") && !href.includes("jeffry.in");

      if (isExternal) {
        trackEvent("click", "external_link", href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}

export function useCodeBlockCopy() {
  useEffect(() => {
    const handleCopy = () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 20) {
        const isCode = document.activeElement?.closest("pre, code");
        if (isCode) {
          trackEvent("copy", "code_block", selection.slice(0, 50));
        }
      }
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, []);
}

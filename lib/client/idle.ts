const IDLE_TIMEOUT = 2_000;
const FALLBACK_DELAY = 200;

export const scheduleIdleTask = (task: () => void): (() => void) => {
  const supportsIdleCallback = typeof window.requestIdleCallback === "function";

  if (supportsIdleCallback) {
    const idleId = window.requestIdleCallback(task, { timeout: IDLE_TIMEOUT });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(task, FALLBACK_DELAY);
  return () => window.clearTimeout(timeoutId);
};

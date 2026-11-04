import { Children, createElement, isValidElement, type ReactElement, type ReactNode } from "react";
import type { FieldStep, StepProps } from "./types";

export function getFrames(children: ReactNode, steps?: FieldStep[] | string) {
  const fields = typeof steps === "string" ? parseFieldSteps(steps) : steps;
  if (fields)
    return fields.map(({ title, note, lines, anchor }) => {
      const props = {
        "data-title": title,
        "data-note": note,
        "data-lines": lines,
        "data-anchor": anchor,
        children,
      };
      return createElement<StepProps>("section", props);
    });
  return Children.toArray(children).filter(isFrame);
}

export function highlightStep(root: HTMLElement | null, lines: number[] = []) {
  const codeLines = root?.querySelectorAll(".scrolly-code__frames section:not([hidden]) .line");
  codeLines?.forEach((line, index) => {
    const highlighted = lines.includes(index + 1);
    line.classList.toggle("scrolly-code-highlight", highlighted);
  });
  if (lines.length === 0) {
    root?.dispatchEvent(new Event("scroll-tooltip-step", { bubbles: true }));
    return;
  }
  const viewport = root?.querySelector<HTMLElement>(".scrolly-code__frames");
  const target = viewport?.querySelector<HTMLElement>(".scrolly-code-highlight");
  const canScroll = viewport && target;
  if (!canScroll) return;
  const offset = target.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
  viewport.scrollTop += offset - 80;
  root?.dispatchEvent(new Event("scroll-tooltip-step", { bubbles: true }));
}

export function observeSteps(root: HTMLElement | null, onSelect: (index: number) => void) {
  const canObserve = root && typeof IntersectionObserver !== "undefined";
  if (!canObserve) return;
  const markers = root.querySelectorAll("[data-scrolly-step]");
  const handleEntries: IntersectionObserverCallback = (entries) => {
    const entry = entries.findLast((candidate) => candidate.isIntersecting);
    if (!entry) return;
    const index = Number(entry.target.getAttribute("data-scrolly-step"));
    const validIndex = Number.isInteger(index) && index >= 0 && index < markers.length;
    if (validIndex) onSelect(index);
  };
  let observer = watchMarkers(markers, handleEntries);
  const resize = () => {
    observer?.disconnect();
    observer = watchMarkers(markers, handleEntries);
  };
  window.addEventListener("resize", resize);
  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", resize);
  };
}

export function scrollToStep(root: HTMLElement | null, index: number) {
  const selector = `[data-scrolly-step="${index}"]`;
  const marker = root?.querySelector<HTMLElement>(selector);
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? true;
  const behavior = reduceMotion ? "auto" : "smooth";
  marker?.scrollIntoView?.({ behavior, block: "start" });
}

export function getNavigationIndex(key: string, current: number, count: number) {
  if (count === 0) return null;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  const next = (current + 1) % count;
  const previous = (current + count - 1) % count;
  if (key === "ArrowDown") return next;
  if (key === "ArrowUp") return previous;
  if (key === "ArrowRight") return next;
  if (key === "ArrowLeft") return previous;
  return null;
}

export function getTooltipParts(note: string, content: ReactNode) {
  const source = getContentText(content);
  const matches = Array.from(source.matchAll(/"([^"\n]+)"/g));
  const identifiers = matches.flatMap((match) => {
    const value = match[1].toLowerCase();
    const baseIdentifier = value.split("@")[0];
    return [value, baseIdentifier];
  });
  const terms = new Set(identifiers);
  return note.split(/([\w@^>=/-]+(?:\.[\w@^>=/-]+)*)/g).map((text) => {
    const code = terms.has(text.toLowerCase());
    return { text, code };
  });
}

function getContentText(content: ReactNode): string {
  return Children.toArray(content)
    .map((child) => {
      if (typeof child === "string") return child;
      if (typeof child === "number") return String(child);
      if (!isValidElement<{ children?: ReactNode }>(child)) return "";
      return getContentText(child.props.children);
    })
    .join("");
}

function isFrame(node: ReactNode): node is ReactElement<StepProps> {
  if (!isValidElement<StepProps>(node)) return false;
  const title = node.props["data-title"];
  const hasTitle = typeof title === "string";
  return hasTitle;
}

function parseFieldSteps(source: string): FieldStep[] {
  const steps: unknown = JSON.parse(source);
  const valid = Array.isArray(steps) && steps.length > 0 && steps.every(isFieldStep);
  if (!valid)
    throw new Error("Walkthrough steps require a title, note, and positive line numbers.");
  return steps as FieldStep[];
}

function isFieldStep(value: unknown): value is FieldStep {
  const isObject = value && typeof value === "object";
  if (!isObject) return false;
  const step = value as Partial<FieldStep>;
  const hasText = typeof step.title === "string" && typeof step.note === "string";
  const validLines = Array.isArray(step.lines) && step.lines.every(isLineNumber);
  const hasAnchor = typeof step.anchor === "string" && step.anchor.trim().length > 0;
  const validAnchor = step.anchor === undefined || hasAnchor;
  const valid = hasText && validLines && validAnchor;
  return valid;
}

function isLineNumber(value: unknown): value is number {
  const valid = typeof value === "number" && Number.isInteger(value) && value > 0;
  return valid;
}

function watchMarkers(markers: NodeListOf<Element>, callback: IntersectionObserverCallback) {
  const compact = window.matchMedia?.("(max-width: 599px)").matches ?? false;
  if (compact) return null;
  const top = Math.round(window.innerHeight * 0.4);
  const bottom = Math.max(0, window.innerHeight - top - 1);
  const rootMargin = `-${top}px 0px -${bottom}px 0px`;
  const observer = new IntersectionObserver(callback, { rootMargin });
  markers.forEach((marker) => observer.observe(marker));
  return observer;
}

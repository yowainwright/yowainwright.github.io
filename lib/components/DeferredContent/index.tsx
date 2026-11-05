"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

export function DeferredContent({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => observeContent(root.current, () => setReady(true)), []);
  const placeholder = ready ? undefined : { minHeight: 400 };
  return <div ref={root} style={placeholder} aria-busy={!ready}>{ready && children}</div>;
}

function observeContent(root: HTMLElement | null, reveal: () => void) {
  if (!root) return;
  if (typeof IntersectionObserver === "undefined") return reveal();
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    reveal();
    observer.disconnect();
  }, { rootMargin: "300px" });
  observer.observe(root);
  return () => observer.disconnect();
}

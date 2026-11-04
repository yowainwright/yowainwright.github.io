"use client";

import React, { useEffect, useRef, useState, type HTMLAttributes } from "react";

type TooltipProps = {
  step: string | number;
  targetId?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function Tooltip({ children, step, targetId, className = "", ...attributes }: TooltipProps) {
  const popup = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState({ children, step });
  const exiting = display.step !== step;
  useEffect(() => {
    popup.current?.dispatchEvent(new Event("scroll-tooltip-step", { bubbles: true }));
  }, [step, display.step]);
  useEffect(() => {
    if (display.step === step) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const delay = reduced ? 0 : 180;
    const timer = setTimeout(() => setDisplay({ children, step }), delay);
    return () => clearTimeout(timer);
  }, [children, step, display.step]);
  const classes = `scroll-tooltip ${className}`;
  const content = exiting ? display.children : children;
  return (
    <span
      {...attributes}
      className={classes}
      data-tooltip-auto=""
      data-tooltip-step={step}
      data-tooltip-target={targetId}
      aria-hidden="true"
    >
      <span className="scroll-tooltip__content" data-exiting={exiting} ref={popup}>
        {content}
      </span>
    </span>
  );
}

"use client";

import React, { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Tooltip } from "../Tooltip";
import {
  getFrames,
  getNavigationIndex,
  getTooltipParts,
  highlightStep,
  observeSteps,
  scrollToStep,
} from "./utils";
import type { StepButtonProps, ScrollyCodeProps, ScrollyCodeViewProps } from "./types";

export function ScrollyCode({ children, steps }: ScrollyCodeProps) {
  const root = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const frames = getFrames(children, steps);
  const sharedCode = Boolean(steps);
  const lines = frames[activeIndex]?.props["data-lines"];
  useEffect(() => observeSteps(root.current, setActiveIndex), [children, steps]);
  useEffect(() => highlightStep(root.current, lines), [activeIndex, lines]);
  const onSelect = (index: number) => {
    setActiveIndex(index);
    scrollToStep(root.current, index);
  };
  const view = { frames, activeIndex, panelId, onSelect, sharedCode };
  return (
    <div className="scrolly-code" ref={root} aria-label="Code walkthrough">
      <CodePanel {...view} />
    </div>
  );
}

function Navigation(props: ScrollyCodeViewProps) {
  const { frames, activeIndex, panelId, onSelect } = props;
  const buttons = frames.map((frame, index) => {
    const title = frame.props["data-title"];
    const button = { title, index, activeIndex, panelId, onSelect };
    return <StepButton key={title} {...button} />;
  });
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => handleNavigationKey(event, props);
  return (
    <nav className="scrolly-code__navigation" aria-label="Example steps" onKeyDown={onKeyDown}>
      {buttons}
    </nav>
  );
}

function StepButton({ title, index, activeIndex, panelId, onSelect }: StepButtonProps) {
  const current = index === activeIndex;
  const onClick = () => onSelect(index);
  return (
    <button type="button" aria-pressed={current} aria-controls={panelId} onClick={onClick}>
      {title}
    </button>
  );
}

function handleNavigationKey(event: KeyboardEvent<HTMLElement>, props: ScrollyCodeViewProps) {
  const { activeIndex, frames, onSelect } = props;
  const index = getNavigationIndex(event.key, activeIndex, frames.length);
  if (index === null) return;
  event.preventDefault();
  onSelect(index);
  event.currentTarget.querySelectorAll("button")[index]?.focus();
}

function CodePanel(props: ScrollyCodeViewProps) {
  const { frames, activeIndex, panelId, sharedCode } = props;
  const height = `${frames.length * 70}vh`;
  const trackStyle = { "--scrolly-code-height": height } as React.CSSProperties;
  const gridTemplateRows = `repeat(${frames.length}, 1fr)`;
  const markersStyle = { gridTemplateRows };
  const markers = frames.map((frame, index) => (
    <div key={frame.props["data-title"]} data-scrolly-step={index} />
  ));
  const frameViews = frames.map((frame, index) => {
    const hidden = index !== activeIndex;
    return (
      <section key={frame.props["data-title"]} hidden={hidden}>
        {frame.props.children}
      </section>
    );
  });
  const views = sharedCode ? <section>{frames[activeIndex]?.props.children}</section> : frameViews;
  const note = frames[activeIndex]?.props["data-note"] ?? "";
  const content = frames[activeIndex]?.props.children;
  const anchor = frames[activeIndex]?.props["data-anchor"];
  const tooltipParts = getTooltipParts(note, content).map(({ text, code }, index) => {
    const className = code ? "code-tooltip-token" : undefined;
    return (
      <span key={index} className={className}>
        {text}
      </span>
    );
  });
  const position = `${activeIndex + 1} / ${frames.length}`;
  return (
    <div className="scrolly-code__track" style={trackStyle}>
      <div className="scrolly-code__markers" style={markersStyle} aria-hidden="true">
        {markers}
      </div>
      <div className="scrolly-code__panel" id={panelId}>
        <Navigation {...props} />
        <div className="scrolly-code__content">
          <div className="scrolly-code__position">Example walkthrough · {position}</div>
          <div className="scrolly-code__frames">{views}</div>
          <p className="scrolly-code__note" aria-live="polite">
            {note}
          </p>
        </div>
        <Tooltip className="scrolly-code__tooltip" step={activeIndex} data-tooltip-anchor={anchor}>
          {tooltipParts}
        </Tooltip>
      </div>
    </div>
  );
}

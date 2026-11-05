"use client";

import React, { useId, type ReactNode } from "react";

type InfoBlockProps = {
  title: string;
  children: ReactNode;
};

export function InfoBlock({ title, children }: InfoBlockProps) {
  const titleId = useId();
  return (
    <aside className="info-block" aria-labelledby={titleId}>
      <h4 id={titleId}>{title}</h4>
      {children}
    </aside>
  );
}

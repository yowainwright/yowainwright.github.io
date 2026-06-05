"use client";

import React from "react";
import type { InlineSourceProps } from "./types";

export const InlineSource = ({ url, children }: InlineSourceProps) => (
  <sup className="citation">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="citation__link"
    >
      [{children}]
    </a>
  </sup>
);

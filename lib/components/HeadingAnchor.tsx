"use client";

import React, { useState } from "react";
import { Link, Check } from "lucide-react";

interface HeadingAnchorProps {
  headingId: string;
}

export default function HeadingAnchor({ headingId }: HeadingAnchorProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}${window.location.pathname}#${headingId}`;
    await navigator.clipboard.writeText(url);

    window.history.pushState(null, "", `#${headingId}`);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span onClick={handleClick} className="heading-link-icon">
      {copied ? (
        <Check size={18} className="heading-icon" />
      ) : (
        <Link size={18} className="heading-icon" />
      )}
    </span>
  );
}

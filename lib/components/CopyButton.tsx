"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  container: HTMLElement;
}

export default function CopyButton({ container }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = container
      .closest(".shiki-wrapper")
      ?.querySelector("pre.shiki code");
    if (!codeElement) return;

    const code = codeElement.textContent || "";
    await navigator.clipboard.writeText(code);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className="shiki-copy-button"
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
      data-copied={copied}
    >
      {copied ? (
        <Check className="shiki-check-icon" size={16} />
      ) : (
        <Copy className="shiki-copy-icon" size={16} />
      )}
    </button>
  );
}

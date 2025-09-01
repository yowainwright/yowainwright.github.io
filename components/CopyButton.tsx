'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  codeId: string;
}

export default function CopyButton({ codeId }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.querySelector(`#${codeId} code`);
    if (!codeElement) return;
    
    const code = codeElement.textContent || '';
    await navigator.clipboard.writeText(code);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className="shiki-copy-button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
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
"use client";

import React, { useCallback, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface MermaidDialogProps {
  isOpen: boolean;
  onClose: () => void;
  svgContent: string;
}

export function MermaidDialog({ isOpen, onClose, svgContent }: MermaidDialogProps) {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mermaid-diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [svgContent]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="mermaid-dialog" onClick={handleBackdropClick}>
      <div className="mermaid-dialog__content">
        <TransformWrapper
          defaultScale={1}
          minScale={0.1}
          maxScale={5}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
          pinch={{ step: 5 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="mermaid-dialog__toolbar">
                <div className="mermaid-dialog__controls">
                  <button
                    className="mermaid-dialog__button"
                    onClick={() => zoomIn()}
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    className="mermaid-dialog__button"
                    onClick={() => zoomOut()}
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <button
                    className="mermaid-dialog__button"
                    onClick={() => resetTransform()}
                    aria-label="Reset zoom"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    className="mermaid-dialog__button"
                    onClick={handleDownload}
                    aria-label="Download SVG"
                  >
                    <Download size={16} />
                  </button>
                </div>
                <button
                  className="mermaid-dialog__close"
                  onClick={onClose}
                  aria-label="Close dialog"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="mermaid-transform-wrapper">
                <TransformComponent>
                  <div
                    className="mermaid-dialog__svg-container"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}
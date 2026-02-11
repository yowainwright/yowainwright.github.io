"use client";

import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';
import type { MermaidDialogProps } from '../types';

export const MermaidDialog: React.FC<MermaidDialogProps> = ({
  isOpen,
  onClose,
  svgContent
}) => {
  const [transformRef, setTransformRef] = useState<any>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    if (transformRef) {
      transformRef.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (transformRef) {
      transformRef.zoomOut();
    }
  };


  const handleDownload = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svg = doc.documentElement;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'mermaid-diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="mermaid-dialog" onClick={onClose}>
      <div className="mermaid-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="mermaid-dialog-toolbar">
          <div className="mermaid-dialog-controls">
            <button
              onClick={handleZoomIn}
              aria-label="Zoom in"
              className="mermaid-dialog-button"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              aria-label="Zoom out"
              className="mermaid-dialog-button"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={handleDownload}
              aria-label="Download SVG"
              className="mermaid-dialog-button"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="mermaid-dialog-button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <TransformWrapper
          ref={setTransformRef}
          initialScale={1.5}
          minScale={0.1}
          maxScale={10}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
          doubleClick={{ disabled: false }}
          centerOnInit={true}
          limitToBounds={false}
        >
          <TransformComponent wrapperClass="mermaid-transform-wrapper">
            <div
              className="mermaid-svg-container"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};
import React from 'react';

interface WrappedYAxisLabelProps {
  value: string;
  x: number;
  y: number;
  maxWidth?: number;
  fontSize?: number;
}

const wrapText = (text: string, maxWidth: number = 100): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + ' ' + word;

    if (testLine.length * 6 < maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  return lines;
};

export const WrappedYAxisLabel: React.FC<WrappedYAxisLabelProps> = ({
  value,
  x,
  y,
  maxWidth = 100,
  fontSize = 12,
}) => {
  const lines = wrapText(value, maxWidth);
  const lineHeight = fontSize * 1.2;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform="rotate(-90)">
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * lineHeight}
            textAnchor="middle"
            fontSize={fontSize}
            fill="currentColor"
            dy={fontSize / 2}
          >
            {line}
          </text>
        ))}
      </g>
    </g>
  );
};
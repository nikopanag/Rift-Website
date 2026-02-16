import React from 'react';

interface GlowProps {
  color: string;
  style?: React.CSSProperties;
}

export function Glow({ color, style }: GlowProps) {
  return (
    <div
      style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: color,
        filter: 'blur(150px)',
        opacity: 0.1,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

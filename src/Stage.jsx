import React, { useLayoutEffect, useState } from 'react';

const W = 960, H = 540;

function fit() {
  const s = Math.min(window.innerWidth / W, window.innerHeight / H);
  return { s, x: (window.innerWidth - W * s) / 2, y: (window.innerHeight - H * s) / 2 };
}

/** Feste 960x540-Fläche, gleichmäßig auf die maximal verfügbare Fenstergröße skaliert und zentriert. */
export default function Stage({ children }) {
  const [f, setF] = useState(fit);
  useLayoutEffect(() => {
    const on = () => setF(fit());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return (
    <div className="stage" style={{ transform: `translate(${f.x}px, ${f.y}px) scale(${f.s})` }}>
      {children}
    </div>
  );
}

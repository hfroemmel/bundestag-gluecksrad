import React from 'react';

// Meliora: ascent 745 / descent 255 (1000 upm). Chromium rundet Ascent und Descent auf ganze Pixel;
// mit line-height 1 liegt die Grundlinie daher bei top + round(0.745 * size) + halbes Restleading.
const baselineOffset = (s) => {
  const a = Math.round(0.745 * s), d = Math.round(0.255 * s);
  return a + (s - a - d) / 2;
};

/** Text-Span aus der PDF: (x, y) = linker Rand / Grundlinie in Designpunkten. Zeilenumbrüche sind fest. */
export default function Text({ x, y, s, b, t }) {
  return (
    <p className="txt abs" style={{ left: x, top: y - baselineOffset(s), fontSize: s, fontWeight: b ? 700 : 400 }}>
      {t}
    </p>
  );
}

import React from 'react';
import Text from './Text.jsx';
import frage5 from './assets/frage5.jpg';
import antwort5 from './assets/antwort5.jpg';

// Bilder je Frage/Auflösung (Position und Größe stehen in content.js)
const IMAGES = { '5-q': frage5, '5-a': antwort5 };

/** Inhalt der Frage- bzw. Auflösungsseite (ohne Kopfzeile und Zahlenkreis, die bleiben beim Wechsel stehen). */
export function QuestionContent({ q, answer }) {
  const items = answer ? q.a : q.q;
  const img = answer ? q.aimg : q.qimg;
  const box = (r) => ({ left: r[0], top: r[1], width: r[2] - r[0], height: r[3] - r[1] });
  return (
    <>
      {img && <img className="abs" src={IMAGES[`${q.n}-${answer ? 'a' : 'q'}`]} alt="" draggable={false} style={box(img)} />}
      {answer && q.bar && <div className="abs bar" style={box(q.bar)} />}
      {items.map((it, i) => <Text key={i} {...it} />)}
    </>
  );
}

/** Magentafarbener Zahlenkreis: Frage -> Auflösung -> Home. */
export function NumberButton({ q, answer, onClick }) {
  return (
    <button className="num-btn" onClick={onClick} aria-label={answer ? 'Zurück zum Glücksrad' : 'Auflösung zeigen'}>
      <Text {...q.num} x={q.num.x - 815.2} y={q.num.y - 410} />
    </button>
  );
}

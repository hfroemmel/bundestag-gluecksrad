import React from 'react';
import Header from './Header.jsx';
import Text from './Text.jsx';
import frage5 from './assets/frage5.jpg';

const IMAGES = { 5: frage5 };

/** Frage- bzw. Auflösungsseite. Der magentafarbene Zahlenkreis ist der Button (Frage -> Auflösung -> Home). */
export default function QuestionPage({ q, answer, onNumber }) {
  const items = answer ? q.a : q.q;
  const img = !answer && q.img;
  return (
    <>
      {answer && q.bar && (
        <div className="abs bar" style={{ left: q.bar[0], top: q.bar[1], width: q.bar[2] - q.bar[0], height: q.bar[3] - q.bar[1] }} />
      )}
      <Header />
      {img && (
        <img className="abs" src={IMAGES[q.n]} alt="" draggable={false}
          style={{ left: q.img[0], top: q.img[1], width: q.img[2] - q.img[0], height: q.img[3] - q.img[1] }} />
      )}
      {items.map((it, i) => <Text key={i} {...it} />)}
      <button className="num-btn" onClick={onNumber} aria-label={answer ? 'Zurück zum Glücksrad' : 'Auflösung zeigen'}>
        <Text {...q.num} x={q.num.x - 815.2} y={q.num.y - 410} />
      </button>
    </>
  );
}

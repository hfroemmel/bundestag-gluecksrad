import React from 'react';
import Header from './Header.jsx';
import Text from './Text.jsx';
import wheel from './assets/wheel.webp';
import { HOME_TITLE, WHEEL_NUMBERS } from './content.js';

const PAD = 3; // Klickfläche etwas größer als die weiße Zahlenscheibe (Radius ~11)

export default function Home({ onPick }) {
  return (
    <>
      <Header />
      {/* Glücksrad (Originalgrafik aus der PDF, Ausschnitt x 50–430, y 115–500) */}
      <img className="abs" src={wheel} alt="" draggable={false} style={{ left: 50, top: 115, width: 380, height: 385 }} />
      <Text {...HOME_TITLE} />
      {WHEEL_NUMBERS.map(({ n, x, y, r }) => (
        <button key={n} className="hit" aria-label={`Frage ${n}`} onClick={() => onPick(n)}
          style={{ left: x - r - PAD, top: y - r - PAD, width: 2 * (r + PAD), height: 2 * (r + PAD) }} />
      ))}
    </>
  );
}

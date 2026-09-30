import React from 'react';
import Text from './Text.jsx';
import eagle from './assets/eagle.png';
import { JOKER } from './content.js';

const [ex0, ey0, ex1, ey1] = JOKER.eagle;
const EAGLE_CX = (ex0 + ex1) / 2, EAGLE_CY = (ey0 + ey1) / 2;

/**
 * Jokerseite (PDF-Seite 40). Der große Adler fliegt aus dem angeklickten Adlerfeld des Glücksrads heraus
 * (`from` = Mittelpunkt des Feldes), ein Lichtschein und zwei Ringe breiten sich hinter ihm aus, danach
 * fährt der pinke Balken auf und „Jocker“ schwebt ein. Klick auf den Adler → zurück zum Glücksrad
 * (der Adler schrumpft dabei wieder in sein Feld).
 */
export default function Joker({ from, onBack }) {
  const vars = { '--dx': `${from.x - EAGLE_CX}px`, '--dy': `${from.y - EAGLE_CY}px`, '--cx': `${EAGLE_CX}px`, '--cy': `${EAGLE_CY}px` };
  return (
    <div className="joker" style={vars}>
      <div className="joker-glow" />
      <div className="joker-ring" />
      <div className="joker-ring r2" />
      <div className="abs joker-bar" style={{ left: JOKER.bar[0], top: JOKER.bar[1], width: JOKER.bar[2] - JOKER.bar[0], height: JOKER.bar[3] - JOKER.bar[1], background: JOKER.fill }} />
      <Text {...JOKER.text} className="joker-text" />
      <button className="joker-eagle" onClick={onBack} aria-label="Zurück zum Glücksrad"
        style={{ left: ex0, top: ey0, width: ex1 - ex0, height: ey1 - ey0 }}>
        <img src={eagle} alt="" draggable={false} />
      </button>
    </div>
  );
}

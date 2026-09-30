import React, { useEffect, useState } from 'react';
import Stage from './Stage.jsx';
import Home from './Home.jsx';
import Header from './Header.jsx';
import Joker from './Joker.jsx';
import Presence from './Presence.jsx';
import { QuestionContent, NumberButton } from './QuestionPage.jsx';
import { QUESTIONS } from './content.js';

// view: { n: null }            -> Home
//       { n, answer: false }   -> Frage n   (PDF-Seite 2n)
//       { n, answer: true }    -> Auflösung (PDF-Seite 2n+1)
//       { joker: {x, y} }      -> Joker (PDF-Seite 40); x/y = angeklicktes Adlerfeld
export default function App() {
  const [view, setView] = useState({ n: null, answer: false, joker: null });

  // Bilder/Schriften vorladen, damit beim Umschalten nichts nachlädt
  useEffect(() => { document.fonts?.load('22px Meliora'); document.fonts?.load('700 22px Meliora'); }, []);

  const q = view.n && QUESTIONS[view.n - 1];
  const home = { n: null, answer: false, joker: null };
  const toggle = () => setView(view.answer ? home : { n: q.n, answer: true, joker: null });
  return (
    <Stage>
      <Header />
      <Presence id={q || view.joker ? null : 'home'} variant="zoom">
        {!q && !view.joker && (
          <Home onPick={(n) => setView({ n, answer: false, joker: null })} onJoker={(joker) => setView({ n: null, answer: false, joker })} />
        )}
      </Presence>
      <Presence id={q ? `${q.n}-${view.answer ? 'a' : 'q'}` : null}>
        {q && <QuestionContent q={q} answer={view.answer} />}
      </Presence>
      <Presence id={q ? q.n : null} variant="pop">
        {q && <NumberButton q={q} answer={view.answer} onClick={toggle} />}
      </Presence>
      <Presence id={view.joker ? 'joker' : null} variant="joker">
        {view.joker && <Joker from={view.joker} onBack={() => setView(home)} />}
      </Presence>
    </Stage>
  );
}

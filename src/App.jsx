import React, { useEffect, useState } from 'react';
import Stage from './Stage.jsx';
import Home from './Home.jsx';
import Header from './Header.jsx';
import Presence from './Presence.jsx';
import { QuestionContent, NumberButton } from './QuestionPage.jsx';
import { QUESTIONS } from './content.js';

// view: { n: null }            -> Home
//       { n, answer: false }   -> Frage n   (PDF-Seite 2n)
//       { n, answer: true }    -> Auflösung (PDF-Seite 2n+1)
export default function App() {
  const [view, setView] = useState({ n: null, answer: false });

  // Bilder/Schriften vorladen, damit beim Umschalten nichts nachlädt
  useEffect(() => { document.fonts?.load('22px Meliora'); document.fonts?.load('700 22px Meliora'); }, []);

  const q = view.n && QUESTIONS[view.n - 1];
  const toggle = () => setView(view.answer ? { n: null, answer: false } : { n: q.n, answer: true });
  return (
    <Stage>
      <Header />
      <Presence id={q ? null : 'home'} variant="zoom">
        {!q && <Home onPick={(n) => setView({ n, answer: false })} />}
      </Presence>
      <Presence id={q ? `${q.n}-${view.answer ? 'a' : 'q'}` : null}>
        {q && <QuestionContent q={q} answer={view.answer} />}
      </Presence>
      <Presence id={q ? q.n : null} variant="pop">
        {q && <NumberButton q={q} answer={view.answer} onClick={toggle} />}
      </Presence>
    </Stage>
  );
}

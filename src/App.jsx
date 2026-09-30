import React, { useEffect, useState } from 'react';
import Stage from './Stage.jsx';
import Home from './Home.jsx';
import QuestionPage from './QuestionPage.jsx';
import { QUESTIONS } from './content.js';

// view: { n: null }            -> Home
//       { n, answer: false }   -> Frage n   (PDF-Seite 2n)
//       { n, answer: true }    -> Auflösung (PDF-Seite 2n+1)
export default function App() {
  const [view, setView] = useState({ n: null, answer: false });

  // Bilder/Schriften vorladen, damit beim Umschalten nichts nachlädt
  useEffect(() => { document.fonts?.load('22px Meliora'); document.fonts?.load('700 22px Meliora'); }, []);

  const q = view.n && QUESTIONS[view.n - 1];
  return (
    <Stage>
      {!q && <Home onPick={(n) => setView({ n, answer: false })} />}
      {q && (
        <QuestionPage
          q={q}
          answer={view.answer}
          onNumber={() => setView(view.answer ? { n: null, answer: false } : { n: q.n, answer: true })}
        />
      )}
    </Stage>
  );
}

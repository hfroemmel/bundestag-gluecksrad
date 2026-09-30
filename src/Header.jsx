import React from 'react';
import header from './assets/header.png';
import logo from './assets/logo.svg';

/** Adler + „Deutscher Bundestag“ (oben links) und Logo „Demokratie Möglich Machen“ (oben rechts). */
export default function Header() {
  return (
    <>
      <img className="abs" src={header} alt="Deutscher Bundestag" draggable={false}
        style={{ left: 28.3, top: 36.3, width: 367.4, height: 58.7 }} />
      <img className="abs" src={logo} alt="Demokratie Möglich Machen" draggable={false}
        style={{ left: 760, top: 30, width: 180, height: 120 }} />
    </>
  );
}

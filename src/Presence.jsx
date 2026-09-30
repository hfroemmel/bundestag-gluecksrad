import React, { useEffect, useState } from 'react';

const EXIT_MS = 220;

/**
 * Blendet Inhalte beim Wechsel von `id` weich über: der alte Inhalt bleibt kurz als „leave“-Ebene
 * (nicht klickbar, `inert`) stehen, der neue erscheint als „enter“-Ebene. Beim ersten Rendern gibt es keine Animation.
 */
export default function Presence({ id, variant = 'rise', children }) {
  const [layers, setLayers] = useState([{ id, node: children, leaving: false, first: true }]);
  const last = layers[layers.length - 1];

  if (last.id !== id) {
    setLayers([...layers.map((l) => ({ ...l, leaving: true })), { id, node: children, leaving: false }]);
  }

  useEffect(() => {
    if (!layers.some((l) => l.leaving)) return;
    const t = setTimeout(() => setLayers((ls) => ls.filter((l) => !l.leaving)), EXIT_MS + 30);
    return () => clearTimeout(t);
  }, [layers]);

  return layers.map((l, i) => {
    const current = !l.leaving && i === layers.length - 1;
    return (
      <div key={l.id ?? 'none'} className={`layer ${variant} ${l.leaving ? 'leave' : l.first ? '' : 'enter'}`}
        {...(l.leaving ? { inert: '' } : {})}>
        {current ? children : l.node}
      </div>
    );
  });
}

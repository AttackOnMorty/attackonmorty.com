'use client';

import { useEnsureInkDefs } from '@/lib/ink/react';
import { stamp } from '@/lib/ink/art/rubber-stamp';

// Looseleaf's <Stamp> imports the whole sticker library to resolve presets;
// drawing the one stamp directly keeps ~65 kB out of every page.
export default function ArchivedStamp({ seed, className }) {
  useEnsureInkDefs();
  const res = stamp('Archived', 'rect', {
    ink: 'red',
    sub: 'kept for the record',
    w: 176,
    h: 68,
    tilt: -7,
    seed,
  });
  return (
    <svg
      role="img"
      aria-label="Archived"
      viewBox={`0 0 ${res.w} ${res.h}`}
      width={res.w}
      height={res.h}
      className={['pointer-events-none shrink-0 overflow-visible', className].join(' ')}
      dangerouslySetInnerHTML={{ __html: res.svg }}
    />
  );
}

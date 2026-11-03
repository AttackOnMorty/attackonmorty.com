'use client';

import Giscus from '@giscus/react';

// giscus.app loads the theme with CORS from its own origin, so it must be the
// public URL (vercel.json adds the header). Browsers block it from localhost.
const theme = 'https://www.attackonmorty.com/giscus-theme.css';

export default function Comments() {
  return (
    <Giscus
      id="comments"
      repo="AttackOnMorty/attackonmorty.com"
      repoId="R_kgDOOoVNiA"
      category="Comments"
      categoryId="DIC_kwDOOoVNiM4CqFSX"
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="en"
      crossorigin="anonymous"
    />
  );
}

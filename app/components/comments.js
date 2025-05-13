'use client';

import Giscus from '@giscus/react';

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
      theme="preferred_color_scheme"
      lang="en"
      crossorigin="anonymous"
    />
  );
}

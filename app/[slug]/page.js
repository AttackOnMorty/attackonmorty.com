import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Fragment } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkSmartpants from 'remark-smartypants';

import NextLink from 'next/link';

import { PageHeader, PageTitle, PageContent, PageFooter } from '@/components/ui/page';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Prose } from '@/components/ui/typography';
import { CodeBlock } from '@/components/ui/code-block';
import { Button } from '@/components/ui/button';
import { Signature } from '@/components/ui/signature';
import { Tape } from '@/components/ui/tape';

import Link from '../Link';
import Comments from '../components/comments';
import ArchivedStamp from '../ArchivedStamp';
import { formatDate } from '../posts';
import { remarkMdxEvalCodeBlock } from './mdx.js';

// Fenced code blocks arrive as <pre><code className="language-x">…</code></pre>.
function Pre({ children }) {
  const { className = '', children: code = '' } = children?.props ?? {};
  const language = className.replace('language-', '') || undefined;
  return (
    <CodeBlock
      className="ll-not-prose my-8"
      code={String(code).replace(/\n$/, '')}
      language={language}
    />
  );
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const filename = './public/' + slug + '/index.md';
  const file = await readFile(filename, 'utf8');
  let postComponents = {};
  try {
    postComponents = await import('../../public/' + slug + '/components.js');
  } catch (e) {
    if (!e || e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
  let Wrapper = postComponents.Wrapper ?? Fragment;
  const { content, data } = matter(file);
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-8 sm:px-10 sm:py-10">
      <NextLink
        href="/"
        className="-mx-1 flex w-fit items-center gap-2.5 px-1 font-bold hover:ll-swipe focus-visible:ll-swipe"
      >
        <Avatar size="sm" seed="luke">
          <AvatarImage src="/avi.jpg" alt="" />
          <AvatarFallback name="Luke Mao" />
        </Avatar>
        AttackOnMorty
      </NextLink>
      <PageHeader className="relative">
        {data.archived && (
          <ArchivedStamp
            seed={slug}
            className="absolute -top-14 end-0 max-sm:-top-12 max-sm:origin-top-right max-sm:scale-75"
          />
        )}
        <time dateTime={data.date} className="font-type text-sm tracking-wide text-pencil-text">
          {formatDate(data.date)}
        </time>
        <PageTitle seed={slug}>{data.title}</PageTitle>
      </PageHeader>
      <PageContent>
        <Prose className="post">
          <Wrapper>
            <MDXRemote
              source={content}
              components={{
                a: Link,
                pre: Pre,
                img: ({ src, ...rest }) => {
                  if (src && !/^https?:\/\//.test(src)) {
                    // https://github.com/gaearon/overreacted.io/issues/827
                    src = `/${slug}/${src}`;
                  }
                  // Spans, not divs: markdown puts images inside <p>.
                  return (
                    <span className="relative my-8 block">
                      <Tape
                        seed={src}
                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                      />
                      <img
                        src={src}
                        {...rest}
                        className="mx-auto bg-photo p-3 shadow-(--ll-shadow-slip)"
                      />
                    </span>
                  );
                },
                ...postComponents,
              }}
              options={{
                mdxOptions: {
                  useDynamicImport: true,
                  remarkPlugins: [
                    remarkSmartpants,
                    remarkGfm,
                    [remarkMdxEvalCodeBlock, filename],
                  ],
                  rehypePlugins: [
                    [rehypeSlug],
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: 'wrap',
                        properties: {
                          className: 'linked-heading',
                          target: '_self',
                        },
                      },
                    ],
                  ],
                },
              }}
            />
          </Wrapper>
        </Prose>
      </PageContent>
      <PageFooter className="flex-wrap border-t-0 pt-6">
        <Signature size="sm" seed="luke-signature">
          Luke Mao
        </Signature>
        {/* Plain <a> / next/link: Link.js sets an inline transition that would override Button's press animation. */}
        <div className="flex flex-wrap gap-2">
          {data.youtube && (
            <Button asChild variant="outline" size="sm">
              <a href={data.youtube} target="_blank" rel="noreferrer">
                Watch on YouTube
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <NextLink href="/">
              <Icon name="arrow-left" className="rtl:-scale-x-100" />
              All posts
            </NextLink>
          </Button>
        </div>
      </PageFooter>
      <Comments />
    </article>
  );
}

export async function generateStaticParams() {
  const entries = await readdir('./public/', { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const file = await readFile('./public/' + slug + '/index.md', 'utf8');
  let { data } = matter(file);
  return {
    title: data.title,
    description: data.spoiler,
  };
}

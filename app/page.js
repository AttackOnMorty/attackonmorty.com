import NextLink from 'next/link';

import { metadata, getPosts, formatDate } from './posts';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { Lettering } from '@/components/ui/lettering';
import { PageDescription, PageFooter, PageHeader } from '@/components/ui/page';

export { metadata };

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10">
      <PageHeader className="gap-4">
        <div className="flex items-center gap-4">
          <Avatar size="xl" seed="luke" className="size-14 sm:size-16">
            <AvatarImage src="/avi.jpg" alt="" />
            <AvatarFallback name="Luke Mao" />
          </Avatar>
          <div className="flex min-w-0 flex-col gap-1">
            {/* Pink and purple offsets carry over the old gradient title. */}
            <Lettering
              as="h1"
              size="md"
              tone="bubblegum"
              duotone="grape"
              className="max-sm:text-[2.1rem]"
            >
              AttackOnMorty
            </Lettering>
            <p className="font-type text-sm tracking-wide text-pencil-text">by Luke Mao</p>
          </div>
        </div>
        <PageDescription className="text-lg text-ink-soft">
          Imagination is the limit.
        </PageDescription>
      </PageHeader>

      <section aria-label="Posts" className="flex flex-col gap-2">
        <ItemGroup ruled className="-mx-4">
          {posts.map((post) => (
            <Item key={post.slug} asChild seed={post.slug}>
              <NextLink href={`/${post.slug}/`}>
                <ItemContent>
                  <time
                    dateTime={post.date}
                    className="font-type text-[13px] tracking-wide text-pencil-text"
                  >
                    {formatDate(post.date)}
                  </time>
                  <ItemTitle className="font-script text-[1.65rem] leading-tight">
                    {post.title}
                  </ItemTitle>
                  <ItemDescription className="line-clamp-none text-[15px]">
                    {post.spoiler}
                  </ItemDescription>
                </ItemContent>
              </NextLink>
            </Item>
          ))}
        </ItemGroup>
      </section>

      <PageFooter className="font-type tracking-wide">
        <span>&copy; {new Date().getFullYear()} Luke Mao</span>
        <nav aria-label="Links" className="flex gap-4">
          <a
            href="https://github.com/AttackOnMorty"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-1 underline-offset-4 hover:ll-swipe focus-visible:ll-swipe"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/luke-mao/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-1 underline-offset-4 hover:ll-swipe focus-visible:ll-swipe"
          >
            LinkedIn
          </a>
          <a href="/rss.xml" className="underline decoration-1 underline-offset-4 hover:ll-swipe focus-visible:ll-swipe">
            RSS
          </a>
        </nav>
      </PageFooter>
    </main>
  );
}

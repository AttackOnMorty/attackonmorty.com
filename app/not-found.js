import { Paper } from '@/components/ui/paper';
import { Lettering } from '@/components/ui/lettering';
import { Mascot } from '@/components/ui/mascot';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';

export default function NotFound() {
  return (
    <Paper
      as="section"
      tape="both"
      seed="not-found"
      className="mx-3 flex max-w-2xl flex-col items-center gap-4 px-6 py-12 text-center sm:mx-auto"
    >
      <Mascot pose="shrug" size={160} className="h-[160px] w-auto" />
      <Lettering as="h1" size="md" tone="marker" seed="not-found-title">
        Not found
      </Lettering>
      <p className="text-lg text-ink-soft">This page doesn&apos;t exist (yet?).</p>
      {/* next/link, not ./Link: its inline transition would override Button's press animation. */}
      <Button asChild>
        <NextLink href="/">Back to all posts</NextLink>
      </Button>
    </Paper>
  );
}

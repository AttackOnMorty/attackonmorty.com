import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { Feed } from 'feed';

export const metadata = {
  title: 'AttackOnMorty — A blog by Luke Mao',
  description: 'A blog by Luke Mao',
  openGraph: {
    title: 'AttackOnMorty',
  },
  alternates: {
    types: {
      'application/atom+xml': 'https://attackonmorty.com/atom.xml',
      'application/rss+xml': 'https://attackonmorty.com/rss.xml',
    },
  },
};

export async function getPosts() {
  const entries = await readdir('./public/', { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile('./public/' + dir + '/index.md', 'utf8'))
  );
  const posts = dirs
    .map((slug, i) => {
      const fileContent = fileContents[i];
      const { data } = matter(fileContent);
      return { slug, ...data };
    })
    .filter((post) => !post.archived);
  posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });
  return posts;
}

export async function generateFeed() {
  const posts = await getPosts();
  const site_url = 'https://attackonmorty.com/';

  const feedOptions = {
    author: {
      name: 'Luke Mao',
      email: 'pfmao@icloud.com',
      link: site_url,
    },
    description: metadata.description,
    favicon: `${site_url}/icon.png`,
    feedLinks: { atom: `${site_url}atom.xml`, rss: `${site_url}rss.xml` },
    generator: 'Feed for Node.js',
    id: site_url,
    image: 'https://github.com/attackonmorty.png',
    link: site_url,
    title: metadata.title,
  };

  const feed = new Feed(feedOptions);

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.date),
      description: post.spoiler,
      id: `${site_url}${post.slug}/`,
      link: `${site_url}${post.slug}/`,
      title: post.title,
    });
  }

  return feed;
}

import { getCollection } from 'astro:content';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET({ site }: { site: URL | undefined }) {
  const base = site ?? new URL('https://manyava-school.if.ua');
  const news = (await getCollection('news'))
    .filter(({ data }) => data.review.status === 'published')
    .sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
  const items = news
    .map(
      (entry) => `<item>
  <title>${escapeXml(entry.data.title)}</title>
  <description>${escapeXml(entry.data.description)}</description>
  <link>${new URL(`/news/${entry.id}/`, base)}</link>
  <guid>${new URL(`/news/${entry.id}/`, base)}</guid>
  <pubDate>${entry.data.publishedAt.toUTCString()}</pubDate>
</item>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Новини Манявського ліцею</title>
  <description>Офіційні новини Манявського ліцею Солотвинської селищної ради.</description>
  <link>${base}</link>
  <language>uk</language>
  ${items}
</channel>
</rss>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

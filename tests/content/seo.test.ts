import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function htmlFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  });
}

describe('SEO output', () => {
  it('має унікальні title, description і canonical для indexable routes', () => {
    const records = htmlFiles('dist')
      .filter((file) => !file.includes('/admin/'))
      .map((file) => {
        const html = readFileSync(file, 'utf8');
        return {
          file,
          title: /<title>([^<]+)<\/title>/.exec(html)?.[1],
          description: /<meta name="description" content="([^"]+)"/.exec(html)?.[1],
          canonical: /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1],
        };
      })
      .filter(({ file }) => !file.endsWith('404.html'));

    for (const record of records) {
      expect(record.title, record.file).toBeTruthy();
      expect(record.description, record.file).toBeTruthy();
      expect(record.canonical, record.file).toMatch(/^https?:\/\//);
    }
    expect(new Set(records.map(({ canonical }) => canonical)).size).toBe(records.length);
  });

  it('публікує favicon, Open Graph image та RSS discovery', () => {
    const html = readFileSync('dist/index.html', 'utf8');
    expect(existsSync('public/favicon.svg')).toBe(true);
    expect(html).toContain('property="og:image"');
    expect(html).toContain('type="application/rss+xml"');
  });
});

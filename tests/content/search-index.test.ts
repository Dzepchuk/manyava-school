import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Pagefind publication boundary', () => {
  it('позначає лише public main content і виключає admin', () => {
    const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    const admin = readFileSync('public/admin/index.html', 'utf8');
    const pagefindConfig = readFileSync('pagefind.yml', 'utf8');

    expect(layout).toContain('data-pagefind-body');
    expect(layout).toContain('SearchMetadata');
    expect(admin).toMatch(/noindex, nofollow/);
    expect(pagefindConfig).toContain('[data-pagefind-ignore]');
  });

  it('не індексує admin у зібраному індексі', () => {
    if (!existsSync('dist/pagefind/pagefind-entry.json')) {
      execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
    }

    const entry = JSON.parse(readFileSync('dist/pagefind/pagefind-entry.json', 'utf8')) as {
      languages: Record<string, { hash: string }>;
    };
    const adminHtml = readFileSync('dist/admin/index.html', 'utf8');

    expect(Object.keys(entry.languages)).toContain('uk');
    expect(adminHtml).toMatch(/noindex, nofollow/);
  });
});

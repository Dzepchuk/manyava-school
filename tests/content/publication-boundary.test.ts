import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { contentStatusSchema } from '../../src/lib/validation/common';

describe('межа production-контенту', () => {
  it('content schema не допускає draft у main', () => {
    expect(contentStatusSchema.safeParse('draft').success).toBe(false);
  });

  it('admin shell заборонений для індексації та виключений із Pagefind', () => {
    const adminHtml = fs.readFileSync(path.resolve('public/admin/index.html'), 'utf8');
    expect(adminHtml).toMatch(/name="robots" content="noindex, nofollow"/);

    const pagefindDirectory = path.resolve('dist/pagefind');
    if (fs.existsSync(pagefindDirectory)) {
      const indexFiles = fs
        .readdirSync(pagefindDirectory, { recursive: true })
        .filter((file) => typeof file === 'string' && file.endsWith('.pf_index'));
      const indexText = indexFiles
        .map((file) => fs.readFileSync(path.join(pagefindDirectory, file as string), 'utf8'))
        .join('');
      expect(indexText).not.toContain('/admin/');
    }
  });

  it('public routes explicitly filter current collections', () => {
    const routes = [
      'src/pages/news/index.astro',
      'src/pages/notices/index.astro',
      'src/pages/events/index.astro',
    ].map((file) => fs.readFileSync(path.resolve(file), 'utf8'));
    expect(routes[0]).toContain('isPublished');
    expect(routes[1]).toContain('splitNoticesByExpiry');
    expect(routes[2]).toContain('splitEventsByDate');
  });
});

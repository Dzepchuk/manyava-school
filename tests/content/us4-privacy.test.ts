import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('US4 privacy contract', () => {
  it('не містить форм, списків учнів або неописаних iframe', () => {
    const files = [
      ...globSync('src/pages/{parents,students}/**/*.astro'),
      ...globSync('src/content/pages/{parents,students}/**/*.md'),
      'src/pages/bullying-prevention.astro',
      'src/components/content/SafeguardingContacts.astro',
    ];

    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      expect(source, file).not.toMatch(/<form\b/i);
      expect(source, file).not.toMatch(/<iframe\b/i);
      expect(source, file).not.toMatch(/список учнів:/i);
    }
  });
});

import { readFileSync, statSync } from 'node:fs';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import { mediaRightsSchema } from '../../src/lib/validation/media';

describe('media rights register', () => {
  it('містить затверджений запис для кожного стартового зображення', () => {
    const register = mediaRightsSchema.parse(
      parse(readFileSync('src/data/media-rights.yml', 'utf8')),
    );
    const building = register.media.find(({ id }) => id === 'manyava-lyceum-building');

    expect(building).toBeDefined();
    expect(building?.depictsSchoolReality).toBe(true);
    expect(building?.containsChildren).toBe(false);
    expect(statSync(`public${building?.path}`).size).toBe(building?.bytes);
  });

  it('блокує оманливий documentary caption для stock-зображення', () => {
    expect(() =>
      mediaRightsSchema.parse({
        media: [
          {
            id: 'stock-school',
            path: '/media/stock.webp',
            alt: 'Умовна шкільна будівля',
            sourceUrl: 'https://example.org/stock.webp',
            sourceDescription: 'Зовнішнє стокове зображення.',
            license: 'CC0',
            licenseProof: 'https://example.org/license',
            depictsSchoolReality: false,
            containsChildren: false,
            width: 100,
            height: 100,
            mimeType: 'image/webp',
            bytes: 1000,
            approvedBy: 'director',
            approvedAt: '2026-07-29',
            caption: 'Будівля Манявського ліцею',
          },
        ],
      }),
    ).toThrow(/реальний ліцей/i);
  });
});

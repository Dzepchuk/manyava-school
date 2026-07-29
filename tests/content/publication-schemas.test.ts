import { describe, expect, it } from 'vitest';
import {
  assertUniquePublicationSlugs,
  eventFrontmatterSchema,
  newsFrontmatterSchema,
  noticeFrontmatterSchema,
} from '../../src/lib/validation/publications';

const review = {
  ownerId: 'director',
  createdAt: '2026-07-29',
  updatedAt: '2026-07-29',
  reviewedAt: '2026-07-29',
  reviewDueAt: '2027-01-29',
  status: 'published',
};

describe('контракти публікацій', () => {
  it('вимагає alt для змістового зображення новини', () => {
    const result = newsFrontmatterSchema.safeParse({
      title: 'Запуск сайту',
      description: 'Офіційний сайт ліцею готується до запуску для громади.',
      publishedAt: '2026-07-29',
      authorDisplayName: 'Манявський ліцей',
      cover: {
        src: '/media/manyava-lyceum-building.webp',
        width: 592,
        height: 299,
        license: 'Надано для публікації',
        approvedBy: 'director',
        approvedAt: '2026-07-29',
        containsChildren: false,
        depictsSchoolReality: true,
      },
      review,
    });

    expect(result.success).toBe(false);
  });

  it('приймає валідні оголошення й події та відхиляє некоректний діапазон', () => {
    expect(
      noticeFrontmatterSchema.safeParse({
        title: 'Оголошення',
        description: 'Перевірене оголошення для шкільної спільноти.',
        startsAt: '2026-07-01',
        expiresAt: '2026-08-01',
        audience: 'community',
        priority: 'normal',
        review,
      }).success,
    ).toBe(true);

    expect(
      eventFrontmatterSchema.safeParse({
        title: 'Подія',
        description: 'Підтверджена подія для шкільної спільноти.',
        startsAt: '2026-08-02',
        endsAt: '2026-08-01',
        timeStatus: 'confirmed',
        format: 'onsite',
        review,
      }).success,
    ).toBe(false);
  });

  it('відхиляє повторний slug у межах колекції', () => {
    expect(() => assertUniquePublicationSlugs(['launch', 'launch'])).toThrow(/унікальним/);
  });
});

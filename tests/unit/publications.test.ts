import { describe, expect, it } from 'vitest';
import {
  sortNewsNewestFirst,
  splitEventsByDate,
  splitNoticesByExpiry,
} from '../../src/lib/content/publications';

const review = {
  ownerId: 'director',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  reviewedAt: new Date('2026-01-01'),
  reviewDueAt: new Date('2027-01-01'),
  status: 'published' as const,
};

describe('публікації', () => {
  it('сортує новини від найновішої', () => {
    const news = [
      { title: 'Стара', publishedAt: new Date('2026-01-01'), review },
      { title: 'Нова', publishedAt: new Date('2026-02-01'), review },
    ];

    expect(sortNewsNewestFirst(news).map(({ title }) => title)).toEqual(['Нова', 'Стара']);
  });

  it('відокремлює актуальні оголошення від прострочених', () => {
    const now = new Date('2026-02-15T12:00:00Z');
    const notices = [
      {
        title: 'Актуальне',
        startsAt: new Date('2026-02-01'),
        expiresAt: new Date('2026-02-28'),
        review,
      },
      {
        title: 'Завершене',
        startsAt: new Date('2026-01-01'),
        expiresAt: new Date('2026-01-31'),
        review,
      },
    ];

    expect(splitNoticesByExpiry(notices, now).current[0]?.title).toBe('Актуальне');
    expect(splitNoticesByExpiry(notices, now).archived[0]?.title).toBe('Завершене');
  });

  it('розділяє майбутні й минулі події за кінцевою датою', () => {
    const now = new Date('2026-02-15T12:00:00Z');
    const events = [
      {
        title: 'Майбутня',
        startsAt: new Date('2026-03-01'),
        timeStatus: 'confirmed' as const,
        review,
      },
      {
        title: 'Минула',
        startsAt: new Date('2026-01-01'),
        endsAt: new Date('2026-01-02'),
        timeStatus: 'confirmed' as const,
        review,
      },
    ];

    expect(splitEventsByDate(events, now).upcoming[0]?.title).toBe('Майбутня');
    expect(splitEventsByDate(events, now).archived[0]?.title).toBe('Минула');
  });
});

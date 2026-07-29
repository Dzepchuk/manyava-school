import type {
  EventFrontmatter,
  NewsFrontmatter,
  NoticeFrontmatter,
} from '../validation/publications';

type PublicationWithReview = {
  review: { status: 'published' | 'archived' };
};

export function isPublished<T extends PublicationWithReview>(publication: T): boolean {
  return publication.review.status === 'published';
}

export function isArchived<T extends PublicationWithReview>(publication: T): boolean {
  return publication.review.status === 'archived';
}

export function sortNewsNewestFirst<T extends Pick<NewsFrontmatter, 'publishedAt'>>(
  news: T[],
): T[] {
  return [...news].sort((left, right) => right.publishedAt.getTime() - left.publishedAt.getTime());
}

export function splitNoticesByExpiry<
  T extends Pick<NoticeFrontmatter, 'startsAt' | 'expiresAt' | 'review'>,
>(notices: T[], now = new Date()): { current: T[]; archived: T[] } {
  const visible = notices.filter(isPublished);
  return {
    current: visible
      .filter(({ startsAt, expiresAt }) => startsAt <= now && expiresAt >= now)
      .sort((left, right) => left.expiresAt.getTime() - right.expiresAt.getTime()),
    archived: notices
      .filter(({ expiresAt, review }) => expiresAt < now || review.status === 'archived')
      .sort((left, right) => right.expiresAt.getTime() - left.expiresAt.getTime()),
  };
}

export function splitEventsByDate<
  T extends Pick<EventFrontmatter, 'startsAt' | 'endsAt' | 'review'>,
>(events: T[], now = new Date()): { upcoming: T[]; archived: T[] } {
  const effectiveEnd = (event: T) => event.endsAt ?? event.startsAt;
  return {
    upcoming: events
      .filter((event) => isPublished(event) && effectiveEnd(event) >= now)
      .sort((left, right) => left.startsAt.getTime() - right.startsAt.getTime()),
    archived: events
      .filter((event) => effectiveEnd(event) < now || isArchived(event))
      .sort((left, right) => right.startsAt.getTime() - left.startsAt.getTime()),
  };
}

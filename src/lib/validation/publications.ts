import { z } from 'zod';
import { reviewMetadataSchema, safeHttpsUrlSchema } from './common';

export const mediaRefSchema = z
  .object({
    src: z.string().startsWith('/media/'),
    alt: z.string().min(5).max(180),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    sourceUrl: safeHttpsUrlSchema.optional(),
    license: z.string().min(3).max(180),
    approvedBy: z.string().min(1),
    approvedAt: z.coerce.date(),
    containsChildren: z.boolean(),
    publicationBasis: z.string().min(3).max(180).optional(),
    depictsSchoolReality: z.boolean(),
  })
  .strict()
  .superRefine(({ containsChildren, publicationBasis }, context) => {
    if (containsChildren && !publicationBasis) {
      context.addIssue({
        code: 'custom',
        message: 'Для зображення дітей потрібна зафіксована підстава публікації.',
        path: ['publicationBasis'],
      });
    }
  });

const publicationBase = {
  title: z.string().min(3).max(120),
  description: z.string().min(40).max(220),
  review: reviewMetadataSchema,
};

export const newsFrontmatterSchema = z
  .object({
    ...publicationBase,
    publishedAt: z.coerce.date(),
    eventDate: z.coerce.date().optional(),
    cover: mediaRefSchema.optional(),
    gallery: z.array(mediaRefSchema).max(20).default([]),
    authorDisplayName: z.string().min(2).max(120),
    tags: z.array(z.string().min(2).max(40)).max(8).default([]),
    featured: z.boolean().default(false),
  })
  .strict();

export const noticeFrontmatterSchema = z
  .object({
    ...publicationBase,
    startsAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    audience: z.enum(['all', 'parents', 'students', 'staff', 'community']),
    priority: z.enum(['normal', 'important', 'urgent']),
  })
  .strict()
  .refine(({ startsAt, expiresAt }) => expiresAt >= startsAt, {
    message: 'Дата завершення оголошення не може бути раніше початку.',
    path: ['expiresAt'],
  });

export const eventFrontmatterSchema = z
  .object({
    ...publicationBase,
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date().optional(),
    timeStatus: z.enum(['confirmed', 'to-be-confirmed']),
    location: z.string().min(2).max(180).optional(),
    format: z.enum(['onsite', 'online', 'hybrid']),
    externalUrl: safeHttpsUrlSchema.optional(),
  })
  .strict()
  .refine(({ startsAt, endsAt }) => !endsAt || endsAt >= startsAt, {
    message: 'Дата завершення події не може бути раніше початку.',
    path: ['endsAt'],
  });

export function assertUniquePublicationSlugs(slugs: string[]): void {
  if (new Set(slugs).size !== slugs.length) {
    throw new Error('Slug кожної публікації має бути унікальним у межах колекції.');
  }
}

export type NewsFrontmatter = z.infer<typeof newsFrontmatterSchema>;
export type NoticeFrontmatter = z.infer<typeof noticeFrontmatterSchema>;
export type EventFrontmatter = z.infer<typeof eventFrontmatterSchema>;

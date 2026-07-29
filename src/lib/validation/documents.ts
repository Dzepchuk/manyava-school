import { z } from 'zod';
import { reviewMetadataSchema, safeHttpsUrlSchema } from './common';

export const documentMimeTypes = [
  'application/pdf',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
] as const;

export const documentFileSchema = z
  .object({
    path: z.string().startsWith('/documents/').optional(),
    mimeType: z.enum(documentMimeTypes, {
      error: 'Тип файла не входить до дозволеного переліку.',
    }),
    bytes: z
      .number()
      .int()
      .positive()
      .max(10 * 1024 * 1024, 'Розмір документа не може перевищувати 10 МБ.'),
    available: z.boolean().default(true),
  })
  .strict()
  .superRefine(({ available, path }, context) => {
    if (available && !path) {
      context.addIssue({
        code: 'custom',
        message: 'Для доступного документа потрібно вказати шлях до файла.',
        path: ['path'],
      });
    }
  });

export const documentFrontmatterSchema = z
  .object({
    title: z.string().min(3).max(180),
    description: z.string().min(50).max(500),
    documentDate: z.coerce.date(),
    publishedAt: z.coerce.date(),
    categoryId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    legalPublicationId: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    mandatoryPublication: z.boolean().default(false),
    legalPublicationStatus: z.enum(['unverified', 'confirmed', 'superseded']).optional(),
    number: z.string().min(1).max(80).optional(),
    issuer: z.string().min(2).max(180).optional(),
    file: documentFileSchema,
    accessibleSummary: z.string().min(30).max(5_000),
    seriesId: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    supersedes: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    versionStatus: z.enum(['current', 'superseded', 'withdrawn']),
    review: reviewMetadataSchema,
    searchKeywords: z.array(z.string().min(2).max(60)).max(20).default([]),
  })
  .strict()
  .superRefine((document, context) => {
    if (
      document.mandatoryPublication &&
      (!document.legalPublicationId || document.legalPublicationStatus !== 'confirmed')
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Обов’язкове оприлюднення потребує підтвердженої нормативної підстави.',
        path: ['legalPublicationId'],
      });
    }
  });

export const documentCategorySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    label: z.string().min(3).max(120),
    description: z.string().min(20).max(500),
    order: z.number().int().nonnegative(),
    active: z.boolean(),
  })
  .strict();

export const legalPublicationSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(10).max(240),
    sourceTitle: z.string().min(5).max(240),
    sourceUrl: safeHttpsUrlSchema,
    sourceSection: z.string().min(2).max(160),
    verifiedAt: z.coerce.date(),
    verifiedBy: z.string().min(2).max(120),
    reviewDueAt: z.coerce.date(),
    responsibleOwnerId: z.string().min(1),
    publicationPath: z.string().regex(/^\/(?:[a-z0-9-]+\/)*$/),
    status: z.enum(['unverified', 'confirmed', 'superseded']),
  })
  .strict()
  .refine(({ verifiedAt, reviewDueAt }) => reviewDueAt >= verifiedAt, {
    message: 'Дата наступної правової перевірки не може бути раніше перевірки.',
    path: ['reviewDueAt'],
  });

export const documentCategoriesSchema = z.array(documentCategorySchema);
export const legalPublicationsSchema = z.array(legalPublicationSchema);

export interface DocumentSeriesItem {
  id: string;
  seriesId?: string;
  versionStatus: 'current' | 'superseded' | 'withdrawn';
}

export function assertDocumentSeries(items: DocumentSeriesItem[]): void {
  const currentBySeries = new Map<string, string>();

  for (const item of items) {
    if (item.versionStatus !== 'current') continue;
    const seriesId = item.seriesId ?? item.id;
    if (currentBySeries.has(seriesId)) {
      throw new Error(`У серії "${seriesId}" може бути лише одна чинна версія документа.`);
    }
    currentBySeries.set(seriesId, item.id);
  }
}

export type DocumentFrontmatter = z.infer<typeof documentFrontmatterSchema>;
export type DocumentCategory = z.infer<typeof documentCategorySchema>;
export type LegalPublication = z.infer<typeof legalPublicationSchema>;

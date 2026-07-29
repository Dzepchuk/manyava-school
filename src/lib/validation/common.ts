import { z } from 'zod';

export const contentStatusSchema = z.enum(['published', 'archived']);

export const contentOwnerSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  displayName: z.string().min(2).max(120),
  role: z.enum(['administrator', 'editor', 'approver']),
  active: z.boolean(),
  contact: z.email().optional(),
});

export const reviewMetadataSchema = z
  .object({
    ownerId: z.string().min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    reviewedAt: z.coerce.date(),
    reviewDueAt: z.coerce.date(),
    status: contentStatusSchema,
  })
  .refine(({ reviewedAt, reviewDueAt }) => reviewDueAt >= reviewedAt, {
    message: 'Дата наступної перевірки не може бути раніше останньої перевірки.',
    path: ['reviewDueAt'],
  });

export const safeHttpsUrlSchema = z
  .url()
  .refine((value) => new URL(value).protocol === 'https:', 'Дозволено лише HTTPS-посилання.');

export type ContentOwner = z.infer<typeof contentOwnerSchema>;
export type ReviewMetadata = z.infer<typeof reviewMetadataSchema>;

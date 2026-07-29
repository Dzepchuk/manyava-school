import { z } from 'zod';
import { safeHttpsUrlSchema } from './common';

export const mediaRightsEntrySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    path: z.string().startsWith('/media/'),
    alt: z.string().min(5).max(180),
    sourceUrl: safeHttpsUrlSchema.optional(),
    sourceDescription: z.string().min(5).max(300),
    license: z.string().min(3).max(180),
    licenseProof: z.string().min(3).max(300),
    depictsSchoolReality: z.boolean(),
    containsChildren: z.boolean(),
    publicationBasis: z.string().min(3).max(180).optional(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    bytes: z
      .number()
      .int()
      .positive()
      .max(5 * 1024 * 1024),
    approvedBy: z.string().min(1),
    approvedAt: z.coerce.date(),
    caption: z.string().max(240).optional(),
  })
  .strict()
  .superRefine((media, context) => {
    if (media.containsChildren && !media.publicationBasis) {
      context.addIssue({
        code: 'custom',
        message: 'Для зображення дітей потрібна підстава публікації.',
        path: ['publicationBasis'],
      });
    }
    if (
      !media.depictsSchoolReality &&
      media.caption &&
      /ліце(?:й|ю|я|ї|єм)/iu.test(media.caption)
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Стокове зображення не можна підписувати як реальний ліцей.',
        path: ['caption'],
      });
    }
  });

export const mediaRightsSchema = z.object({
  media: z.array(mediaRightsEntrySchema),
});

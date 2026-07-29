import { z } from 'zod';
import { contentOwnerSchema, safeHttpsUrlSchema } from './common';

const phoneSchema = z.object({
  label: z.string().min(2),
  value: z.string().min(7).max(30),
});

export const siteSettingsSchema = z.object({
  officialName: z.string().min(10),
  shortName: z.string().min(2),
  tagline: z.string().min(5),
  address: z.string().min(5),
  phones: z.array(phoneSchema),
  email: z.email(),
  workingHours: z.string().min(3),
  siteUrl: z.url(),
  socialLinks: z.array(safeHttpsUrlSchema).default([]),
  defaultSeo: z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(50).max(180),
  }),
  analyticsEnabled: z.boolean(),
  updatedAt: z.coerce.date(),
  approvedBy: z.string().min(1),
});

export const navigationItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  label: z.string().min(2).max(60),
  path: z.string().startsWith('/'),
  parentId: z.string().nullable().optional(),
  order: z.number().int().nonnegative(),
  audiences: z.array(z.enum(['all', 'parents', 'students', 'staff', 'community'])),
  visible: z.boolean(),
});

export const ownersSchema = z.array(contentOwnerSchema);
export const navigationSchema = z.array(navigationItemSchema).superRefine((items, context) => {
  const ids = new Set(items.map(({ id }) => id));

  for (const item of items) {
    if (item.parentId && !ids.has(item.parentId)) {
      context.addIssue({
        code: 'custom',
        message: `Навігаційний батько "${item.parentId}" не існує.`,
        path: [items.indexOf(item), 'parentId'],
      });
    }
  }
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type NavigationItem = z.infer<typeof navigationItemSchema>;

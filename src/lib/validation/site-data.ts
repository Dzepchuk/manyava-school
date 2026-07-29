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
  contactPublication: z.object({
    address: z.boolean(),
    phones: z.boolean(),
    email: z.boolean(),
    workingHours: z.boolean(),
  }),
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
  const paths = new Set<string>();

  for (const [index, item] of items.entries()) {
    if (paths.has(item.path)) {
      context.addIssue({
        code: 'custom',
        message: `Навігаційний шлях "${item.path}" повторюється.`,
        path: [index, 'path'],
      });
    }
    paths.add(item.path);

    if (item.parentId && !ids.has(item.parentId)) {
      context.addIssue({
        code: 'custom',
        message: `Навігаційний батько "${item.parentId}" не існує.`,
        path: [index, 'parentId'],
      });
    }
  }

  const itemsById = new Map(items.map((item) => [item.id, item]));

  for (const [index, item] of items.entries()) {
    const visited = new Set([item.id]);
    let depth = 1;
    let parentId = item.parentId;

    while (parentId) {
      if (visited.has(parentId)) {
        context.addIssue({
          code: 'custom',
          message: `Навігація містить цикл за участю "${item.id}".`,
          path: [index, 'parentId'],
        });
        break;
      }

      visited.add(parentId);
      depth += 1;
      if (depth > 3) {
        context.addIssue({
          code: 'custom',
          message: 'Навігація не може бути глибшою за три рівні.',
          path: [index, 'parentId'],
        });
        break;
      }
      parentId = itemsById.get(parentId)?.parentId;
    }
  }
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type NavigationItem = z.infer<typeof navigationItemSchema>;

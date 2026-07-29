import { z } from 'zod';
import { reviewMetadataSchema } from './common';
import { mediaRefSchema } from './publications';

const canonicalPathSchema = z
  .string()
  .regex(
    /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*$/,
    'Canonical path має починатися й завершуватися символом "/" та містити лише kebab-case.',
  );

export const pageFrontmatterSchema = z
  .object({
    title: z.string().min(1).max(120),
    description: z.string().min(50).max(180),
    path: canonicalPathSchema,
    section: z.enum(['about', 'parents', 'students', 'safety', 'transparency']),
    review: reviewMetadataSchema,
    seoImage: mediaRefSchema.optional(),
    showInNavigation: z.boolean(),
    searchKeywords: z.array(z.string().min(2).max(60)).max(20).optional(),
  })
  .strict();

const unsafeMarkdownPatterns = [
  { pattern: /<\s*script\b/i, label: 'script' },
  { pattern: /<\s*iframe\b/i, label: 'iframe' },
  { pattern: /\bon[a-z]+\s*=/i, label: 'inline event handler' },
  { pattern: /\bjavascript\s*:/i, label: 'javascript URL' },
  { pattern: /<\s*\/?\s*[a-z][^>]*>/i, label: 'raw HTML' },
];

export function assertSafeMarkdown(markdown: string): void {
  const unsafe = unsafeMarkdownPatterns.find(({ pattern }) => pattern.test(markdown));

  if (unsafe) {
    throw new Error(`Небезпечний Markdown: заборонено ${unsafe.label}.`);
  }
}

export function assertUniquePagePaths(pages: Array<{ id: string; path: string }>): void {
  const idsByPath = new Map<string, string>();

  for (const page of pages) {
    const existingId = idsByPath.get(page.path);
    if (existingId) {
      throw new Error(
        `Canonical path "${page.path}" використано сторінками "${existingId}" і "${page.id}".`,
      );
    }
    idsByPath.set(page.path, page.id);
  }
}

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageFrontmatterSchema } from './lib/validation/pages';
import {
  eventFrontmatterSchema,
  newsFrontmatterSchema,
  noticeFrontmatterSchema,
} from './lib/validation/publications';

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: pageFrontmatterSchema,
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: newsFrontmatterSchema,
});

const notices = defineCollection({
  loader: glob({ base: './src/content/notices', pattern: '**/*.md' }),
  schema: noticeFrontmatterSchema,
});

const events = defineCollection({
  loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
  schema: eventFrontmatterSchema,
});

export const collections = { events, news, notices, pages };

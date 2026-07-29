import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import process from 'node:process';

const site = process.env.PUBLIC_SITE_URL ?? 'https://manyava-school.if.ua';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  image: {
    responsiveStyles: true,
  },
  vite: {
    server: {
      fs: {
        strict: true,
      },
    },
  },
});

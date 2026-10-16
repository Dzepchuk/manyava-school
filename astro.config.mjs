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
    build: {
      // Public pages allow scripts only from 'self', so keep JavaScript in files.
      assetsInlineLimit: (filePath) => (filePath.endsWith('.js') ? false : undefined),
    },
    server: {
      fs: {
        strict: true,
      },
    },
  },
});

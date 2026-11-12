import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://articles.acomptic.com',

  // Keep article URLs, canonical URLs and sitemap URLs consistent.
  trailingSlash: 'never',

  integrations: [
    sitemap(),
  ],
});

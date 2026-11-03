// @ts-check
import { defineConfig } from 'astro/config';

// Set by the GitHub Pages workflow from actions/configure-pages:
//   SITE_URL  e.g. https://kingzion24.github.io (or the custom domain once one is added)
//   BASE_PATH e.g. /MTBC (empty once a custom domain is used)
const site = process.env.SITE_URL || 'https://kingzion24.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  // YouTube thumbnails for the latest-message block are downloaded and optimised at build.
  image: { domains: ['i.ytimg.com'] },
});

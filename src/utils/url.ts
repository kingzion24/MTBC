/**
 * Prefixes a site-relative path with Astro's `base`, so links work both under
 * https://kingzion24.github.io/MTBC/ and later at the root of a custom domain.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: `/${string}`): string => `${base}${path}`;

import type { APIRoute } from 'astro';
import { languages, pageUrl, type Lang } from '../i18n';

// Every public page (language-neutral path). Add new pages here.
const pages = ['/', '/events/', '/news/'] as const;
const langs = Object.keys(languages) as Lang[];

export const GET: APIRoute = ({ site }) => {
  const abs = (lang: Lang, path: `/${string}`) => new URL(pageUrl(lang, path), site).href;
  const urls = pages
    .flatMap((path) =>
      langs.map(
        (lang) =>
          `  <url>\n    <loc>${abs(lang, path)}</loc>\n` +
          langs.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${abs(alt, path)}"/>\n`).join('') +
          '  </url>',
      ),
    )
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};

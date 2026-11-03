/**
 * Footer sitemap: labels come from the i18n dictionary, link targets are defined here once.
 * Most links are in-page anchors on the home page of the same language.
 */
import { pageUrl, ui, type Lang } from '../i18n';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  note: string;
  links: NavLink[];
}

/** Site path, or 'youtube' for the channel. One per label in ui[lang].sitemapGroups. */
type Target = `/${string}` | 'youtube';

const targets: Record<keyof (typeof ui)['en']['sitemapGroups'], Target[]> = {
  visit: ['/#visit', '/#intro', '/#ministries', '/#contact'],
  connect: ['/#ministries', '/#ministries', '/#ministries', '/#ministries', '/#ministries', '/events/'],
  watch: ['/#pastor', 'youtube', 'youtube'],
  about: ['/#intro', '/#pastor', '/#visit', '/#ministries', '/news/'],
};

export const buildSitemap = (lang: Lang, youtubeUrl: string): NavGroup[] =>
  (Object.keys(targets) as (keyof typeof targets)[]).map((key) => {
    const group = ui[lang].sitemapGroups[key];
    return {
      title: group.title,
      note: group.note,
      links: group.links.map((label, i) => {
        const target = targets[key][i] ?? '/';
        return target === 'youtube'
          ? { label, href: youtubeUrl, external: true }
          : { label, href: pageUrl(lang, target) };
      }),
    };
  });

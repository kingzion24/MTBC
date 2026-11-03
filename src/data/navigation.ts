/**
 * Sitemap shared by the footer and the MENU overlay.
 * There's only one page plus the Events / News / Stories lists, so most links are in-page anchors.
 */
import { site } from './content';
import { withBase } from '../utils/url';

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

const groups: NavGroup[] = [
  {
    title: 'Visit',
    note: 'Plan a visit',
    links: [
      { label: 'Service times', href: '/#visit' },
      { label: 'What to expect', href: '/#intro' },
      { label: 'Kids & families', href: '/#ministries' },
      { label: "Newcomers' lunch", href: '/#contact' },
    ],
  },
  {
    title: 'Connect',
    note: 'Get involved',
    links: [
      { label: 'Men', href: '/#ministries' },
      { label: 'Mothers', href: '/#ministries' },
      { label: 'Young adults', href: '/#ministries' },
      { label: 'Prayer', href: '/#ministries' },
      { label: 'Children', href: '/#ministries' },
      { label: 'Events', href: '/events/' },
    ],
  },
  {
    title: 'Watch',
    note: 'Sermons',
    links: [
      { label: 'Latest message', href: '/#pastor' },
      { label: 'Series archive', href: site.youtube, external: true },
      { label: 'Live stream', href: site.youtube, external: true },
    ],
  },
  {
    title: 'About',
    note: 'Who we are',
    links: [
      { label: 'Beliefs', href: '/#intro' },
      { label: 'Leadership', href: '/#pastor' },
      { label: 'Location', href: '/#visit' },
      { label: 'Give', href: '/#ministries' },
      { label: 'News', href: '/news/' },
    ],
  },
];

export const sitemap: NavGroup[] = groups.map((group) => ({
  ...group,
  links: group.links.map((link) => (link.external ? link : { ...link, href: withBase(link.href as `/${string}`) })),
}));

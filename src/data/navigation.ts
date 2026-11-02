/**
 * Sitemap shared by the footer and the MENU overlay.
 * There's only one page plus the Events / News / Stories lists, so most links are in-page anchors.
 */
import { site } from './content';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  note: string;
  href: string;
  links: NavLink[];
}

export const sitemap: NavGroup[] = [
  {
    title: 'Visit',
    note: 'Plan a visit',
    href: '/#visit',
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
    href: '/#ministries',
    links: [
      { label: 'Small groups', href: '/#ministries' },
      { label: 'Serve teams', href: '/#ministries' },
      { label: 'Youth', href: '/events' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Watch',
    note: 'Sermons',
    href: '/#pastor',
    links: [
      { label: 'Latest message', href: '/#pastor' },
      { label: 'Series archive', href: site.youtube, external: true },
      { label: 'Live stream', href: site.youtube, external: true },
    ],
  },
  {
    title: 'About',
    note: 'Who we are',
    href: '/#about',
    links: [
      { label: 'Beliefs', href: '/#intro' },
      { label: 'Leadership', href: '/#pastor' },
      { label: 'Location', href: '/#visit' },
      { label: 'Give', href: '/#ministries' },
      { label: 'News', href: '/news' },
    ],
  },
];

/**
 * Languages, URLs and interface strings.
 * Kiswahili is the default language (served at the site root); English lives under /en/.
 */
import { withBase } from '../utils/url';

export const languages = { sw: 'Kiswahili', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'sw';

/** Astro.currentLocale → Lang. */
export const toLang = (locale: string | undefined): Lang => (locale === 'en' ? 'en' : 'sw');

/** Site-relative page path in a language, e.g. ('en', '/events/') → '/MTBC/en/events/'. */
export const pageUrl = (lang: Lang, path: `/${string}`): string =>
  withBase(lang === defaultLang ? path : `/${lang}${path}`);

/** The language-neutral path of the current page, e.g. '/MTBC/en/news/' → '/news/'. */
export const neutralPath = (pathname: string): `/${string}` => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const withoutBase = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const withoutLang = withoutBase.replace(/^\/en(?=\/|$)/, '');
  return (withoutLang.startsWith('/') ? withoutLang : `/${withoutLang}`) as `/${string}`;
};

/** BCP 47 / Open Graph locale codes. */
export const locales = {
  sw: { html: 'sw', og: 'sw_TZ', intl: 'sw-TZ' },
  en: { html: 'en', og: 'en_GB', intl: 'en-GB' },
} as const;

const en = {
  skipToContent: 'Skip to content',
  homeLogoAlt: 'Manna Tabernacle Bible Church — home',
  opensInNewTab: '(opens in a new tab)',
  language: 'Language',

  // Header, hero, menu, loader
  sundayService: 'Sunday Service',
  planYourVisit: 'Plan your visit',
  menu: 'Menu',
  close: 'Close',
  siteMenu: 'Site menu',
  mainNav: 'Main',
  serviceDetails: 'Service details',
  where: 'Where',
  callUs: 'Call us',
  loading: 'Loading',
  pause: 'Pause',
  play: 'Play',
  backgroundVideo: 'background video',
  heroTitle: ['Daily bread', 'for every soul.'],
  heroLeadName: 'Manna Tabernacle Bible Church.',
  heroLead: ['A family gathered around the Word,', 'in the heart of Dar es Salaam.'],

  // Intro
  introTitle: ['Not only to welcome you,', 'but to feed you.'],
  introLead:
    "Like manna in the wilderness, God's Word is fresh every morning. At MTBC we gather to be fed by Scripture, to worship together, and to carry that bread out into our city.",
  introPoints: [
    {
      title: 'Rooted in the Word.',
      body: 'Everything we do starts with the Bible. Clear, faithful teaching that meets you where you live, Monday to Saturday too.',
    },
    {
      title: 'Worship in Spirit and truth.',
      body: 'Heartfelt praise and honest prayer. We come expecting to meet God, and we leave room for what He wants to do.',
    },
    {
      title: 'Always, a seat at the table.',
      body: 'No dress code, no prerequisites, no one too far gone. Every person who walks in is someone we have been waiting for.',
    },
  ],
  aboutMtbc: 'About MTBC',

  // Newcomers
  newcomersKicker: "New to MTBC? We'd love to meet you.",
  newcomersTitle: 'Join us this Sunday at',

  // Life Together
  storiesTitle: 'Life Together',
  storiesLabel: 'Stories',
  storiesLead: ['Worship, prayer and friendship, woven into ordinary days.', 'A glimpse of life at MTBC.'],
  seeAllStories: 'See all stories',

  // Events
  eventsTitle: 'Gatherings',
  eventsLabel: 'Events',
  eventsLead: "Whether this is your first visit or your fiftieth, there's always a reason to come together.",
  allEvents: 'All events',
  noEvents: 'New gatherings will be announced here soon.',
  tags: 'Tags',
  joinOnZoom: 'Join on Zoom',
  meetingId: 'Meeting ID',
  passcode: 'Passcode',

  // Photo strip
  photoStrip: 'Photos from church life',

  // Ministries
  ministriesTitle: 'Ministries',
  ministriesLabel: 'Get involved',
  ministriesLead:
    "Church is not something you watch, it's something you are part of. Find the ministry where you belong, and a family that will grow with you.",
  findYourPlace: 'Find your place',
  whereAndWhen: 'Where and when',

  // About
  aboutTitle: 'About MTBC',
  aboutLabel: 'Who we are',
  aboutLead:
    'Manna Tabernacle Bible Church is a Bible-centred family meeting in Kisutu, in the heart of Dar es Salaam. Our hope is simple: that everyone who comes hungry leaves fed.',
  aboutLinks: [
    { title: 'What we believe', note: 'Beliefs' },
    { title: 'Our leadership', note: 'Pastors & Elders' },
    { title: 'Give & serve', note: 'Generosity' },
  ],

  // Pastor
  pastorTitle: 'Our Pastor',
  pastorLabel: 'Head Pastor',
  followWatchListen: 'Follow · Watch · Listen',
  instagramDesc: 'Daily devotions & moments',
  youtubeDesc: 'Sermons & teaching series',
  podcastName: 'MTBC Podcast',
  podcastLive: 'Listen to the MTBC Podcast',
  comingSoon: 'Coming soon',
  comingSoonInline: 'coming soon',
  follow: 'Follow',
  watch: 'Watch',
  listen: 'Listen',
  soon: 'Soon',
  playVideo: 'Play',
  watchSermons: 'Watch sermons on YouTube',
  latestMessage: 'Latest message',
  allSermons: 'All sermons',

  // Visit
  visitTitle: 'Visit Us',
  visitLead:
    'One home in the city. Every Sunday from 10:00 we gather in the hall at Kisutu Primary School, Posta Mpya. Come as you are, there is a seat for you.',
  googleMap: 'Google Map',
  serviceTimes: 'Service times',

  // News
  newsTitle: 'News',
  newsLabel: 'Announcements',
  allNews: 'All news',

  // Contact
  contactTitle: 'Come and See',
  contactLabel: 'Contact us',
  contactLead: [
    "You don't need to have anything figured out.",
    'Bring your questions, your doubts, your whole self.',
    'Our doors, and our lunch table, are always open.',
  ],
  planFirstVisit: 'Plan your first visit',
  requestPrayer: 'Request prayer',
  byPhone: 'by phone',

  // Footer
  sitemap: 'Sitemap',
  mapLabel: 'Map — Kisutu, Dar es Salaam',
  opensGoogleMaps: '(opens Google Maps in a new tab)',
  contact: 'Contact',
  tagline: 'Daily bread for every soul...',

  // Pages
  homeTitle: 'Manna Tabernacle Bible Church (MTBC) — Dar es Salaam',
  homeDescription:
    'Manna Tabernacle Bible Church is a Bible-centred family meeting every Sunday 10:00–13:00 at Kisutu Primary School Hall, Posta Mpya, Dar es Salaam.',
  eventsPageTitle: 'Gatherings & Events — MTBC Dar es Salaam',
  eventsPageDescription:
    'Gatherings at Manna Tabernacle Bible Church, Dar es Salaam: prayer, fasting and fellowship.',
  newsPageTitle: 'News & Announcements — MTBC Dar es Salaam',
  newsPageDescription: 'Announcements from Manna Tabernacle Bible Church, Kisutu Hall, Dar es Salaam.',
  storiesPageTitle: 'Life Together — Stories from MTBC Dar es Salaam',
  storiesPageDescription:
    'Worship, prayer and friendship, woven into ordinary days. A glimpse of life at Manna Tabernacle Bible Church.',
  shareImageAlt: 'Manna Tabernacle Bible Church logo over a full Sunday service in Kisutu Hall',
  churchDescription: 'A Bible-centred church family meeting every Sunday in Kisutu, Dar es Salaam.',

  // Menu items (title + italic note)
  nav: {
    visit: { title: 'Visit Us', note: 'Kisutu Hall' },
    stories: { title: 'Life Together', note: 'Stories' },
    events: { title: 'Gatherings', note: 'Events' },
    ministries: { title: 'Ministries', note: 'Get involved' },
    about: { title: 'About MTBC', note: 'Who we are' },
    pastor: { title: 'Our Pastor', note: 'Head Pastor' },
    news: { title: 'News', note: 'Announcements' },
    contact: { title: 'Come and See', note: 'Contact us' },
  },

  // Footer sitemap
  sitemapGroups: {
    visit: {
      title: 'Visit',
      note: 'Plan a visit',
      links: ['Service times', 'What to expect', 'Kids & families', "Newcomers' lunch"],
    },
    connect: {
      title: 'Connect',
      note: 'Get involved',
      links: ['Men', 'Mothers', 'Young adults', 'Prayer', 'Children', 'Events'],
    },
    watch: { title: 'Watch', note: 'Sermons', links: ['Latest message', 'Series archive', 'Live stream'] },
    about: { title: 'About', note: 'Who we are', links: ['Beliefs', 'Leadership', 'Location', 'Give', 'News'] },
  },
};

/** Widen literal string types so each language can use its own words. */
type Strings<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Strings<U>[]
    : T extends object
      ? { [K in keyof T]: Strings<T[K]> }
      : T;

export type UI = Strings<typeof en>;

const sw: UI = {
  skipToContent: 'Ruka hadi maudhui',
  homeLogoAlt: 'Manna Tabernacle Bible Church — ukurasa wa mwanzo',
  opensInNewTab: '(inafunguka kwenye kichupo kipya)',
  language: 'Lugha',

  sundayService: 'Ibada ya Jumapili',
  planYourVisit: 'Panga ziara yako',
  menu: 'Menyu',
  close: 'Funga',
  siteMenu: 'Menyu ya tovuti',
  mainNav: 'Kuu',
  serviceDetails: 'Maelezo ya ibada',
  where: 'Wapi',
  callUs: 'Tupigie simu',
  loading: 'Inapakia',
  pause: 'Simamisha',
  play: 'Cheza',
  backgroundVideo: 'video ya nyuma',
  heroTitle: ['Mkate wa kila siku', 'kwa kila nafsi.'],
  heroLeadName: 'Manna Tabernacle Bible Church.',
  heroLead: ['Familia iliyokusanyika kuzunguka Neno,', 'katikati ya jiji la Dar es Salaam.'],

  introTitle: ['Si kukukaribisha tu,', 'bali kukulisha.'],
  introLead:
    'Kama mana jangwani, Neno la Mungu ni jipya kila asubuhi. Hapa MTBC tunakusanyika ili tulishwe na Maandiko, tuabudu pamoja, na tuupeleke mkate huo katika jiji letu.',
  introPoints: [
    {
      title: 'Tumejengwa juu ya Neno.',
      body: 'Kila tunachofanya kinaanzia kwenye Biblia. Mafundisho yaliyo wazi na ya uaminifu yanayokufikia katika maisha yako ya kila siku, hata Jumatatu hadi Jumamosi.',
    },
    {
      title: 'Ibada katika Roho na kweli.',
      body: 'Sifa za moyoni na maombi ya kweli. Tunakuja tukitarajia kukutana na Mungu, na tunampa nafasi afanye anachotaka.',
    },
    {
      title: 'Daima, kuna nafasi mezani.',
      body: 'Hakuna sharti la mavazi, hakuna masharti, hakuna aliye mbali mno. Kila anayeingia ni mtu tuliyekuwa tukimsubiri.',
    },
  ],
  aboutMtbc: 'Kuhusu MTBC',

  newcomersKicker: 'Mgeni MTBC? Tungependa kukufahamu.',
  newcomersTitle: 'Jiunge nasi Jumapili hii,',

  storiesTitle: 'Maisha Pamoja',
  storiesLabel: 'Hadithi',
  storiesLead: ['Ibada, maombi na urafiki, vimefumwa katika siku za kawaida.', 'Taswira ya maisha ya MTBC.'],
  seeAllStories: 'Tazama hadithi zote',

  eventsTitle: 'Mikusanyiko',
  eventsLabel: 'Matukio',
  eventsLead: 'Iwe ni ziara yako ya kwanza au ya hamsini, daima kuna sababu ya kukusanyika pamoja.',
  allEvents: 'Matukio yote',
  noEvents: 'Mikusanyiko mipya itatangazwa hapa hivi karibuni.',
  tags: 'Lebo',
  joinOnZoom: 'Jiunge kupitia Zoom',
  meetingId: 'Meeting ID',
  passcode: 'Nenosiri',

  photoStrip: 'Picha za maisha ya kanisa',

  ministriesTitle: 'Huduma',
  ministriesLabel: 'Jihusishe',
  ministriesLead:
    'Kanisa si kitu cha kutazama, ni familia unayokuwa sehemu yake. Tafuta huduma unayofaa, na familia itakayokua pamoja nawe.',
  findYourPlace: 'Tafuta nafasi yako',
  whereAndWhen: 'Wapi na lini',

  aboutTitle: 'Kuhusu MTBC',
  aboutLabel: 'Sisi ni nani',
  aboutLead:
    'Manna Tabernacle Bible Church ni familia iliyojengwa juu ya Biblia, inayokutana Kisutu, katikati ya Dar es Salaam. Tumaini letu ni rahisi: kila anayekuja akiwa na njaa aondoke ameshiba.',
  aboutLinks: [
    { title: 'Tunachoamini', note: 'Imani' },
    { title: 'Uongozi wetu', note: 'Wachungaji na Wazee' },
    { title: 'Toa na tumika', note: 'Ukarimu' },
  ],

  pastorTitle: 'Mchungaji Wetu',
  pastorLabel: 'Mchungaji Mkuu',
  followWatchListen: 'Fuatilia · Tazama · Sikiliza',
  instagramDesc: 'Tafakari za kila siku na matukio',
  youtubeDesc: 'Mahubiri na mfululizo wa mafundisho',
  podcastName: 'MTBC Podcast',
  podcastLive: 'Sikiliza MTBC Podcast',
  comingSoon: 'Inakuja hivi karibuni',
  comingSoonInline: 'inakuja hivi karibuni',
  follow: 'Fuata',
  watch: 'Tazama',
  listen: 'Sikiliza',
  soon: 'Karibuni',
  playVideo: 'Cheza',
  watchSermons: 'Tazama mahubiri YouTube',
  latestMessage: 'Ujumbe wa karibuni',
  allSermons: 'Mahubiri yote',

  visitTitle: 'Tutembelee',
  visitLead:
    'Nyumba moja katikati ya jiji. Kila Jumapili kuanzia 10:00 tunakusanyika katika ukumbi wa Shule ya Msingi Kisutu, Posta Mpya. Njoo kama ulivyo, kuna nafasi yako.',
  googleMap: 'Ramani ya Google',
  serviceTimes: 'Muda wa ibada',

  newsTitle: 'Habari',
  newsLabel: 'Matangazo',
  allNews: 'Habari zote',

  contactTitle: 'Njoo Uone',
  contactLabel: 'Wasiliana nasi',
  contactLead: [
    'Huhitaji kuwa umeelewa kila kitu.',
    'Leta maswali yako, mashaka yako, nafsi yako yote.',
    'Milango yetu, na meza yetu ya chakula, iko wazi daima.',
  ],
  planFirstVisit: 'Panga ziara yako ya kwanza',
  requestPrayer: 'Omba kuombewa',
  byPhone: 'kwa simu',

  sitemap: 'Ramani ya tovuti',
  mapLabel: 'Ramani — Kisutu, Dar es Salaam',
  opensGoogleMaps: '(inafungua Ramani za Google kwenye kichupo kipya)',
  contact: 'Mawasiliano',
  tagline: 'Mkate wa kila siku kwa kila nafsi...',

  homeTitle: 'Manna Tabernacle Bible Church (MTBC) — Dar es Salaam',
  homeDescription:
    'Manna Tabernacle Bible Church ni familia iliyojengwa juu ya Biblia, inayokutana kila Jumapili 10:00–13:00 katika Ukumbi wa Shule ya Msingi Kisutu, Posta Mpya, Dar es Salaam.',
  eventsPageTitle: 'Mikusanyiko na Matukio — MTBC Dar es Salaam',
  eventsPageDescription: 'Mikusanyiko ya Manna Tabernacle Bible Church, Dar es Salaam: maombi, kufunga na ushirika.',
  newsPageTitle: 'Habari na Matangazo — MTBC Dar es Salaam',
  newsPageDescription: 'Matangazo kutoka Manna Tabernacle Bible Church, Ukumbi wa Kisutu, Dar es Salaam.',
  storiesPageTitle: 'Maisha Pamoja — Hadithi za MTBC Dar es Salaam',
  storiesPageDescription:
    'Ibada, maombi na urafiki, vimefumwa katika siku za kawaida. Taswira ya maisha ya Manna Tabernacle Bible Church.',
  shareImageAlt: 'Nembo ya Manna Tabernacle Bible Church juu ya ibada ya Jumapili iliyojaa katika Ukumbi wa Kisutu',
  churchDescription: 'Familia ya kanisa iliyojengwa juu ya Biblia, inayokutana kila Jumapili Kisutu, Dar es Salaam.',

  nav: {
    visit: { title: 'Tutembelee', note: 'Ukumbi wa Kisutu' },
    stories: { title: 'Maisha Pamoja', note: 'Hadithi' },
    events: { title: 'Mikusanyiko', note: 'Matukio' },
    ministries: { title: 'Huduma', note: 'Jihusishe' },
    about: { title: 'Kuhusu MTBC', note: 'Sisi ni nani' },
    pastor: { title: 'Mchungaji Wetu', note: 'Mchungaji Mkuu' },
    news: { title: 'Habari', note: 'Matangazo' },
    contact: { title: 'Njoo Uone', note: 'Wasiliana nasi' },
  },

  sitemapGroups: {
    visit: {
      title: 'Tembelea',
      note: 'Panga ziara',
      links: ['Muda wa ibada', 'Utarajie nini', 'Watoto na familia', 'Chakula cha wageni'],
    },
    connect: {
      title: 'Ungana',
      note: 'Jihusishe',
      links: ['Wanaume', 'Akina mama', 'Vijana', 'Maombi', 'Watoto', 'Matukio'],
    },
    watch: { title: 'Tazama', note: 'Mahubiri', links: ['Ujumbe wa karibuni', 'Mahubiri ya zamani', 'Mubashara'] },
    about: { title: 'Kuhusu', note: 'Sisi ni nani', links: ['Imani', 'Uongozi', 'Mahali', 'Toa', 'Habari'] },
  },
};

export const ui: Record<Lang, UI> = { sw, en };

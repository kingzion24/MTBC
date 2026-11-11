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
      title: 'The ministry of the Word.',
      body: 'We are a Word-based, apostolic teaching ministry. As God’s Word is taught, His people come into the knowledge of the truth, and the truth makes them free.',
    },
    {
      title: 'Corporate worship.',
      body: 'We gather to worship God together, with one heart and one voice, expecting to meet Him.',
    },
    {
      title: 'Prayer.',
      body: 'Prayer is the life of this house. We stand together before God for one another, for our families and for our city.',
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
    'Manna Tabernacle Bible Church is a Word-based, apostolic teaching ministry with a strong emphasis on corporate worship, prayer and the ministry of the Word. We meet in Kisutu, in the heart of Dar es Salaam.',
  aboutLinks: [
    { title: 'What we believe', note: 'Beliefs' },
    { title: 'Our leadership', note: 'Pastors & Elders' },
    { title: 'Give & serve', note: 'Generosity' },
  ],


  // Foundation (from the Head Pastor)
  foundationTitle: 'Our Foundation',
  foundationLabel: 'The Word that birthed us',
  foundationLead: 'Two scriptures birthed this ministry. They shape how we teach, pray and serve.',
  foundationVerses: [
    {
      reference: 'Isaiah 45:13',
      text: 'I have raised him up in righteousness, and I will direct all his ways: he shall build my city, and he shall let go my captives, not for price nor reward, saith the LORD of hosts.',
      body: 'We are a ministry that builds, and brings deliverance to God’s people through the teaching of the Word of God. As we minister the Word, God’s people come into the knowledge of the truth, and that truth sets them free. Knowledge of the truth brings deliverance, healing and complete freedom.',
      support: { reference: 'Proverbs 11:9', text: 'But through knowledge shall the just be delivered.' },
    },
    {
      reference: 'Isaiah 49:8',
      text: 'In an acceptable time have I heard thee, and in a day of salvation have I helped thee: and I will preserve thee, and give thee for a covenant of the people, to establish the earth, to cause to inherit the desolate heritages.',
      body: 'As we bring an on-time Word to the people, they are established and come into their inheritance in Christ, by the grace and anointing of God on our lives and ministry.',
    },
  ],
  foundationCoreLabel: 'At the core of our ministry',
  foundationCore: {
    reference: 'Colossians 1:28',
    text: 'Whom we preach, warning every man, and teaching every man in all wisdom; that we may present every man perfect in Christ Jesus.',
    summary: 'To present everyone complete in Christ.',
  },
  bibleVersion: 'KJV',

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

  // Pastor page and sermon library
  sermonsTitle: 'Sermon Library',
  sermonsLabel: 'Teaching',
  sermonsLead: 'Every message from the pulpit of MTBC, gathered in one place: follow a teaching series from its first part, or pick a single message.',
  messagesCount: 'messages',
  seriesCount: 'series',
  libraryNav: 'Sermon library sections',
  seriesTitle: 'Teaching Series',
  seriesLabel: 'Part by part',
  seriesLead: 'Teachings that run over several weeks, in order from the first part.',
  seminarsTitle: 'Seminars & Conferences',
  seminarsLabel: 'Special gatherings',
  servicesTitle: 'Sunday Services',
  servicesLabel: 'Live from Kisutu',
  singlesTitle: 'Single Messages',
  singlesLabel: 'One sitting',
  parts: 'parts',
  part: 'Part',
  openSeries: 'Open series',
  allSeries: 'All series',
  backToPastor: 'Back to the sermon library',
  watchOnYoutube: 'YouTube channel',
  videoPlayer: 'Video player',
  seriesPageLead: 'All parts of this teaching, from the first to the latest.',

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

  // Footer
  sitemap: 'Sitemap',
  footerPages: { title: 'Explore', note: 'On this site' },
  footerConnect: { title: 'Connect', note: 'Stay in touch' },
  mapTitle: 'Map: Kisutu Primary School Hall, Posta Mpya, Dar es Salaam',
  tagline: 'Daily bread for every soul...',

  // Pages
  homeTitle: 'Manna Tabernacle Bible Church (MTBC) — Dar es Salaam',
  homeDescription:
    'Manna Tabernacle Bible Church is a Word-based, apostolic teaching ministry in Dar es Salaam: corporate worship, prayer and the ministry of the Word, every Sunday 10:00–13:00 at Kisutu Primary School Hall.',
  eventsPageTitle: 'Gatherings & Events — MTBC Dar es Salaam',
  eventsPageDescription:
    'Gatherings at Manna Tabernacle Bible Church, Dar es Salaam: prayer, fasting and fellowship.',
  pastorPageTitle: 'Pastor Carlos Kirimbai — Sermons & Teaching Series — MTBC',
  pastorPageDescription:
    'Pastor Carlos Kirimbai of Manna Tabernacle Bible Church, Dar es Salaam, and his full sermon library: teaching series, seminars, Sunday services and single messages.',
  newsPageTitle: 'News & Announcements — MTBC Dar es Salaam',
  newsPageDescription: 'Announcements from Manna Tabernacle Bible Church, Kisutu Hall, Dar es Salaam.',
  shareImageAlt: 'Manna Tabernacle Bible Church logo over a full Sunday service in Kisutu Hall',
  churchDescription: 'A Word-based, apostolic teaching ministry meeting every Sunday in Kisutu, Dar es Salaam.',

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
  },};

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
  heroLead: ['Familia inayosimama ndani ya Neno,', 'katikati ya jiji la Dar es Salaam.'],

  introTitle: ['Si kukukaribisha tu,', 'bali kukulisha.'],
  introLead:
    'Kama mana jangwani, Neno la Mungu ni jipya kila asubuhi. Hapa MTBC tunakusanyika ili tulishwe na Maandiko, tuabudu pamoja, na tuupeleke mkate huo katika jiji letu.',
  introPoints: [
    {
      title: 'Huduma ya Neno.',
      body: 'Sisi ni huduma ya mafundisho ya kitume iliyojengwa juu ya Neno. Neno la Mungu linapofundishwa, watu wake wanaifikia kweli, na kweli hiyo inawaweka huru.',
    },
    {
      title: 'Ibada ya pamoja.',
      body: 'Tunakusanyika kumwabudu Mungu pamoja, kwa moyo mmoja na sauti moja, tukitarajia kukutana naye.',
    },
    {
      title: 'Maombi.',
      body: 'Maombi ni uhai wa nyumba hii. Tunasimama pamoja mbele za Mungu kwa ajili ya kila mmoja wetu, familia zetu na jiji letu.',
    },
  ],
  aboutMtbc: 'Kuhusu MTBC',

  newcomersKicker: 'Mgeni MTBC? Tungependa kukufahamu.',
  newcomersTitle: 'Jiunge nasi Jumapili hii,',

  storiesTitle: 'Maisha Pamoja',
  storiesLabel: 'Hadithi',
  storiesLead: ['Ibada, maombi na umoja, ndani ya jamii yetu.', 'Msingi wa maisha ya MTBC.'],

  eventsTitle: 'Matukio',
  eventsLabel: 'Umoja',
  eventsLead: 'Iwe ni ziara yako ya kwanza au ya hamsini, daima kuna sababu ya kukusanyika pamoja.',
  allEvents: 'Matukio yote',
  noEvents: 'Matukio mapya yatatangazwa hapa hivi karibuni.',
  tags: 'Lebo',
  joinOnZoom: 'Jiunge kupitia Zoom',
  meetingId: 'Meeting ID',
  passcode: 'Nenosiri',

  photoStrip: 'Picha za maisha ya kanisa',

  ministriesTitle: 'Idara',
  ministriesLabel: 'Jihusishe',
  ministriesLead:
    'Kanisa si kitu cha kutazama, ni familia unayokuwa sehemu yake. Jumuika kwenye idara inayokufaa, na familia itakayokua pamoja nawe.',
  findYourPlace: 'Tafuta nafasi yako',
  whereAndWhen: 'Wapi na lini',

  aboutTitle: 'Kuhusu MTBC',
  aboutLabel: 'Sisi ni nani',
  aboutLead:
    'Manna Tabernacle Bible Church ni huduma ya mafundisho ya kitume iliyojengwa juu ya Neno, yenye msisitizo mkubwa katika ibada ya pamoja, maombi na huduma ya Neno. Tunakutana Kisutu, katikati ya Dar es Salaam.',
  aboutLinks: [
    { title: 'Tunachoamini', note: 'Imani' },
    { title: 'Uongozi wetu', note: 'Wachungaji na Wazee' },
    { title: 'Toa na Hudumu', note: 'Ukarimu' },
  ],


  foundationTitle: 'Msingi Wetu',
  foundationLabel: 'Neno lililotuzaa',
  foundationLead: 'Maandiko mawili ndiyo yaliyozaa huduma hii. Yanaongoza jinsi tunavyofundisha, tunavyoomba na tunavyotumika.',
  foundationVerses: [
    {
      reference: 'Isaya 45:13',
      text: 'Mimi nimemwinua katika haki, nami nitazinyosha njia zake zote; yeye ataujenga mji wangu, naye atawaachilia watu wangu waliohamishwa, si kwa fedha wala si kwa thawabu, asema BWANA wa majeshi.',
      body: 'Sisi ni huduma inayojenga na kuleta ukombozi kwa watu wa Mungu kupitia mafundisho ya Neno la Mungu. Tunapolihudumia Neno, watu wa Mungu wanaifikia kweli, na kweli hiyo inawaweka huru. Kuijua kweli huleta ukombozi, uponyaji na uhuru kamili.',
      support: { reference: 'Mithali 11:9', text: 'Bali kwa maarifa wenye haki wataokolewa.' },
    },
    {
      reference: 'Isaya 49:8',
      text: 'BWANA asema hivi, Wakati uliokubalika nimekujibu, na siku ya wokovu nimekusaidia; nami nitakuhifadhi, na kukutoa uwe agano la watu, ili kuiinua nchi, na kuwarithisha urithi uliokuwa ukiwa.',
      body: 'Tunapowaletea watu Neno la wakati wake, wanathibitishwa na kuurithi urithi wao katika Kristo, kwa neema na upako wa Mungu juu ya maisha na huduma yetu.',
    },
  ],
  foundationCoreLabel: 'Kiini cha huduma yetu',
  foundationCore: {
    reference: 'Wakolosai 1:28',
    text: 'Ambaye sisi tunamhubiri, tukimwonya kila mtu na kumfundisha kila mtu katika hekima yote, ili tumlete kila mtu akiwa mtimilifu katika Kristo.',
    summary: 'Kumleta kila mtu akiwa mkamilifu katika Kristo.',
  },
  bibleVersion: 'SUV',

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

  sermonsTitle: 'Maktaba ya Mahubiri',
  sermonsLabel: 'Mafundisho',
  sermonsLead: 'Kila ujumbe kutoka madhabahu ya MTBC, mahali pamoja: fuatilia mfululizo wa mafundisho kuanzia sehemu ya kwanza, au chagua ujumbe mmoja.',
  messagesCount: 'jumbe',
  seriesCount: 'mifululizo',
  libraryNav: 'Sehemu za maktaba ya mahubiri',
  seriesTitle: 'Mifululizo ya Mafundisho',
  seriesLabel: 'Sehemu kwa sehemu',
  seriesLead: 'Mafundisho yanayoendelea kwa wiki kadhaa, kwa mpangilio kuanzia sehemu ya kwanza.',
  seminarsTitle: 'Semina na Makongamano',
  seminarsLabel: 'Mikusanyiko maalum',
  servicesTitle: 'Ibada za Jumapili',
  servicesLabel: 'Mubashara kutoka Kisutu',
  singlesTitle: 'Jumbe Moja Moja',
  singlesLabel: 'Kwa kikao kimoja',
  parts: 'sehemu',
  part: 'Sehemu ya',
  openSeries: 'Fungua mfululizo',
  allSeries: 'Mifululizo yote',
  backToPastor: 'Rudi kwenye maktaba ya mahubiri',
  watchOnYoutube: 'Chaneli ya YouTube',
  videoPlayer: 'Kicheza video',
  seriesPageLead: 'Sehemu zote za fundisho hili, kuanzia ya kwanza hadi ya karibuni.',

  visitTitle: 'Tutembelee',
  visitLead:
    'Nyumba moja katikati ya jiji. Kila Jumapili kuanzia saa 4 asubuhi tunakusanyika katika ukumbi wa Shule ya Msingi Kisutu, Posta Mpya. Njoo kama ulivyo, kuna nafasi yako.',
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

  sitemap: 'Ramani ya tovuti',
  footerPages: { title: 'Gundua', note: 'Katika tovuti hii' },
  footerConnect: { title: 'Ungana nasi', note: 'Tuwasiliane' },
  mapTitle: 'Ramani: Ukumbi wa Shule ya Msingi Kisutu, Posta Mpya, Dar es Salaam',
  tagline: 'Mkate wa kila siku kwa kila nafsi...',

  homeTitle: 'Manna Tabernacle Bible Church (MTBC) — Dar es Salaam',
  homeDescription:
    'Manna Tabernacle Bible Church ni huduma ya mafundisho ya kitume Dar es Salaam: ibada ya pamoja, maombi na huduma ya Neno, kila Jumapili saa 4 asubuhi – 7 mchana katika Ukumbi wa Shule ya Msingi Kisutu.',
  eventsPageTitle: 'Matukio — MTBC Dar es Salaam',
  eventsPageDescription: 'Mikusanyiko ya Manna Tabernacle Bible Church, Dar es Salaam: maombi, kufunga na ushirika.',
  pastorPageTitle: 'Mchungaji Carlos Kirimbai — Mahubiri na Mifululizo ya Mafundisho — MTBC',
  pastorPageDescription:
    'Mchungaji Carlos Kirimbai wa Manna Tabernacle Bible Church, Dar es Salaam, na maktaba yake kamili ya mahubiri: mifululizo ya mafundisho, semina, ibada za Jumapili na jumbe moja moja.',
  newsPageTitle: 'Habari na Matangazo — MTBC Dar es Salaam',
  newsPageDescription: 'Matangazo kutoka Manna Tabernacle Bible Church, Ukumbi wa Kisutu, Dar es Salaam.',
  shareImageAlt: 'Nembo ya Manna Tabernacle Bible Church juu ya ibada ya Jumapili iliyojaa katika Ukumbi wa Kisutu',
  churchDescription: 'Huduma ya mafundisho ya kitume iliyojengwa juu ya Neno, inayokutana kila Jumapili Kisutu, Dar es Salaam.',

  nav: {
    visit: { title: 'Tutembelee', note: 'Ukumbi wa Kisutu' },
    stories: { title: 'Maisha Pamoja', note: 'Hadithi' },
    events: { title: 'Matukio', note: 'Umoja' },
    ministries: { title: 'Idara', note: 'Jihusishe' },
    about: { title: 'Kuhusu MTBC', note: 'Sisi ni nani' },
    pastor: { title: 'Mchungaji Wetu', note: 'Mchungaji Mkuu' },
    news: { title: 'Habari', note: 'Matangazo' },
    contact: { title: 'Njoo Uone', note: 'Wasiliana nasi' },
  },
};

export const ui: Record<Lang, UI> = { sw, en };

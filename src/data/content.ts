/**
 * All site content, in Kiswahili (default) and English.
 *
 * Text fields are written as { sw, en } pairs; everything else (URLs, times, photos) is shared.
 * Components call getContent(lang) and receive plain strings in that language.
 * Kiswahili copy is a first draft: have it reviewed by a native speaker before launch.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

import worshipHandsRaised from '../assets/photos/worship-hands-raised.jpg';
import prayerKneeling from '../assets/photos/prayer-kneeling.jpg';
import congregationWorship from '../assets/photos/congregation-worship.jpg';
import worshipTeam from '../assets/photos/worship-team.jpg';
import youthFellowship from '../assets/photos/youth-fellowship.jpg';
import fellowshipGreeting from '../assets/photos/fellowship-greeting.jpg';
import youngProfessionals from '../assets/photos/young-professionals.jpg';
import womenOfGrace from '../assets/photos/women-of-grace.jpg';
import contactPreacher from '../assets/photos/contact-preacher.jpg';
import sundayServiceHall from '../assets/photos/sunday-service-hall.jpg';
import sundayWorshipStage from '../assets/photos/sunday-worship-stage.jpg';
import childrenPraying from '../assets/photos/children-praying.jpg';
import pastorPortrait from '../assets/photos/pastor-portrait.jpg';
import pastorPreaching from '../assets/photos/pastor-preaching.jpg';
import prayerBowedPoster from '../assets/photos/prayer-bowed-poster.jpg';
import prayerKneelingPoster from '../assets/photos/prayer-kneeling-poster.jpg';
import prayerCirclePoster from '../assets/photos/prayer-circle-poster.jpg';
import sundayPrayerPoster from '../assets/photos/sunday-prayer-poster.jpg';
import sundayWelcome from '../assets/photos/sunday-welcome.jpg';
import sundayHallBack from '../assets/photos/sunday-hall-back.jpg';
import mensFellowshipPoster from '../assets/photos/mens-fellowship-poster.jpg';
import fellowshipGatheringPoster from '../assets/photos/fellowship-gathering-poster.jpg';
import destinyFighters from '../assets/photos/destiny-fighters.jpg';
import womenOfWisdom from '../assets/photos/women-of-wisdom.jpg';
import daughtersOfFaith from '../assets/photos/daughters-of-faith.jpg';

/* ------------------------------------------------------------------ */
/* Localisation helpers                                                */
/* ------------------------------------------------------------------ */

/** A piece of text in both languages. */
export interface L10n {
  sw: string;
  en: string;
}

/** The authoring shape of T: any string may be written as an { sw, en } pair. */
type Raw<T> = T extends string
  ? string | L10n
  : T extends ImageMetadata
    ? T
    : T extends readonly (infer U)[]
      ? Raw<U>[]
      : T extends object
        ? { [K in keyof T]: Raw<T[K]> }
        : T;

const isL10n = (value: unknown): value is L10n =>
  typeof value === 'object' && value !== null && 'sw' in value && 'en' in value && Object.keys(value).length === 2;

const isImage = (value: object) => 'src' in value && 'width' in value && 'format' in value;

/** Resolves every { sw, en } pair in a value to the given language. */
const localize = <T>(value: Raw<T>, lang: Lang): T => {
  const walk = (v: unknown): unknown => {
    if (isL10n(v)) return v[lang];
    if (Array.isArray(v)) return v.map(walk);
    if (typeof v === 'object' && v !== null && !isImage(v)) {
      return Object.fromEntries(Object.entries(v).map(([k, inner]) => [k, walk(inner)]));
    }
    return v;
  };
  return walk(value) as T;
};

/* ------------------------------------------------------------------ */
/* Shapes the components receive (single language)                    */
/* ------------------------------------------------------------------ */

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export interface Site {
  serviceTime: string;
  serviceShort: string;
  venue: string;
  address: string;
  mapUrl: string;
  mapEmbed: string;
  phone: { display: string; tel: string };
  officeHours: string;
  instagram: string;
  youtube: string;
}

/** A short silent clip (encoded by scripts/encode-videos.sh) shown in place of a photo. */
export interface Moment {
  src: `/${string}`;
  /** CSS object-position used when the clip is cropped to its slot. */
  position?: string;
}

export interface Story {
  /** Shown as-is, or as the poster and fallback when `moment` is set. */
  photo: Photo;
  moment?: Moment;
  /** Large italic line shown beside the photo. Use a line break to control wrapping. */
  quote?: string;
  /** Small caption under the photo. */
  caption?: string;
}

export interface OnlineMeeting {
  /** Zoom join link. The passcode is shown separately so it can be typed in. */
  url: string;
  meetingId: string;
  passcode: string;
}

/**
 * Machine-readable recurrence for Event structured data (JSON-LD), in local
 * Africa/Dar es Salaam time. Human-readable times still live in `when`; this is
 * the parallel, parseable form search engines need for event rich results.
 */
export interface EventSchedule {
  /** First day the series runs, yyyy-mm-dd. */
  startDate: string;
  /** Last day the series runs, yyyy-mm-dd. Omit for an open-ended weekly rhythm. */
  endDate?: string;
  /** Days it recurs, as full English weekday names: 'Monday' … 'Sunday'. */
  byDay: string[];
  /** Local clock times, 'HH:mm'. `endTime` may be before `startTime` for overnight slots. */
  startTime: string;
  endTime: string;
}

export interface EventItem {
  title: string;
  subtitle: string;
  /** Shown as-is, or as the poster and fallback when `moment` is set. */
  photo: Photo;
  moment?: Moment;
  category: string;
  tags: string[];
  /** One line per time slot. */
  when: string[];
  place: string;
  online?: OnlineMeeting;
  /** Last day (yyyy-mm-dd, Dar es Salaam time). The event disappears on the first build after it. */
  endDate?: string;
  /** Parseable recurrence for Event JSON-LD; one entry per distinct time pattern. */
  schedule?: EventSchedule[];
}

export interface Ministry {
  title: string;
  /** One line. Draft copy until the church confirms it. */
  description: string;
  photo: Photo;
  /** Optional details shown as tags, e.g. "Kisutu Hall", "Sat 08:00". */
  tags?: string[];
  /** Optional short video loop played behind the card; `photo` is its poster. */
  moment?: { src: string; position?: string };
}

export interface Pastor {
  name: string;
  title: string;
  bio: string;
  instagram: { handle: string; url: string };
  youtube: { handle: string; url: string; channelId: string };
  podcast: { live: boolean; url: string };
  portrait: Photo;
  /** Fallback image and title for the latest-message block if the YouTube feed can't be read at build. */
  preaching: Photo;
  latestMessage: string;
}

export interface NewsPost {
  date: string; // ISO yyyy-mm-dd
  tag: string;
  title: string;
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const mapAddress = 'Kisutu Primary School Hall, Posta Mpya, Dar es Salaam';
/** The church's Instagram (footer, menu); the pastor's own account is on his card. */
const instagram = 'https://www.instagram.com/mtbc_church/';
const pastorInstagram = 'https://www.instagram.com/carloskirimbai/';
const youtube = 'https://www.youtube.com/channel/UCY2Bpc2UZqd_4Px-B7ZuhtQ';

const site: Raw<Site> = {
  // Kiswahili uses Swahili time (saa 4 asubuhi = 10:00).
  serviceTime: { sw: 'Saa 4:00 asubuhi – 7:00 mchana', en: '10:00 – 13:00' },
  serviceShort: { sw: 'Jumapili, saa 4 asubuhi', en: 'Sundays 10:00' },
  venue: { sw: 'Ukumbi wa Kisutu', en: 'Kisutu Hall' },
  address: {
    sw: 'Ukumbi wa Shule ya Msingi Kisutu, Posta Mpya, Dar es Salaam',
    en: mapAddress,
  },
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`,
  /** Google Maps embed (no API key) shown in the footer. */
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent('Kisutu Primary School, Dar es Salaam')}&z=16&output=embed`,
  phone: { display: '+255 754 079 301', tel: '+255754079301' },
  officeHours: {
    sw: 'Saa za ofisi: saa 3 asubuhi – 11 jioni · Tunafunga Jumatatu',
    en: 'Office hours 9:00 – 17:00 · Closed Mondays',
  },
  instagram,
  youtube,
};

const photos = {
  worshipHandsRaised: {
    src: worshipHandsRaised,
    alt: {
      sw: 'Vijana katika kusanyiko wakiinua mikono yao katika ibada karibu na dirisha lililo wazi.',
      en: 'Young people in the congregation lift their hands in worship beside an open window.',
    },
  },
  mensFellowship: {
    src: mensFellowshipPoster,
    alt: {
      sw: 'Wanaume wakizungumza na kucheka pamoja nje ya kanisa.',
      en: 'Men talking and laughing together outside the church.',
    },
  },
  fellowshipGathering: {
    src: fellowshipGatheringPoster,
    alt: {
      sw: 'Waumini wakikusanyika nje baada ya ibada.',
      en: 'Members gathering outside after the service.',
    },
  },
  destinyFighters: {
    src: destinyFighters,
    alt: {
      sw: 'Watoto wakishikana mikono katika duara wakati wa huduma ya watoto.',
      en: 'Children holding hands in a circle during children’s ministry.',
    },
  },
  womenOfWisdom: {
    src: womenOfWisdom,
    alt: {
      sw: 'Akina mama waliovalia mavazi ya rangi wakiwa wameketi pamoja katika mkutano.',
      en: 'Women in colourful dress seated together at a gathering.',
    },
  },
  daughtersOfFaith: {
    src: daughtersOfFaith,
    alt: {
      sw: 'Wanawake vijana watatu wakitabasamu wakiwa wamevalia sare zinazofanana.',
      en: 'Three young women in matching outfits smiling together.',
    },
  },
  prayerKneeling: {
    src: prayerKneeling,
    alt: {
      sw: 'Waumini wakiwa wamepiga magoti, vipaji vya nyuso sakafuni, wakiomba.',
      en: 'Members kneel with their foreheads to the floor in prayer.',
    },
  },
  congregationWorship: {
    src: congregationWorship,
    alt: {
      sw: 'Kusanyiko limesimama mikono juu mbele ya jukwaa na skrini ya nyimbo.',
      en: 'The congregation stands with hands raised in front of the stage and lyrics screen.',
    },
  },
  worshipTeam: {
    src: worshipTeam,
    alt: {
      sw: 'Waimbaji wawili wa sifa wakiimba kwa vipaza sauti jukwaani, picha nyeusi na nyeupe.',
      en: 'Two worship leaders sing into microphones on stage, in black and white.',
    },
  },
  youthFellowship: {
    src: youthFellowship,
    alt: {
      sw: 'Vijana wakiimba na kupiga makofi pamoja.',
      en: 'Young people sing and clap together.',
    },
  },
  fellowshipGreeting: {
    src: fellowshipGreeting,
    alt: {
      sw: 'Wanawake wawili wakitabasamu na kushikana mikono kati ya safu za viti baada ya ibada.',
      en: 'Two women share a smile and clasp hands between rows of chairs after the service.',
    },
  },
  youngProfessionals: {
    src: youngProfessionals,
    alt: {
      sw: 'Mwanamke aliyevaa blauzi nyeupe ameketi akisikiliza kati ya safu za viti vyekundu.',
      en: 'A woman in a white blouse sits listening among rows of red and gold chairs.',
    },
  },
  womenOfGrace: {
    src: womenOfGrace,
    alt: {
      sw: 'Mwanamke aliyevaa gauni la waridi akiomba huku amefumba macho.',
      en: 'A woman in a pink patterned dress prays with her eyes closed.',
    },
  },
  contactPreacher: {
    src: contactPreacher,
    alt: {
      sw: 'Mhubiri akiinua mikono jukwaani huku kusanyiko likiinua mikono yao.',
      en: 'A preacher raises his arms on stage as the congregation lifts their hands.',
    },
  },
  sundayServiceHall: {
    src: sundayServiceHall,
    alt: {
      sw: 'Ukumbi umejaa Jumapili: kusanyiko likiinua mikono huku timu ya sifa ikiongoza jukwaani chini ya maandishi “JESUS”.',
      en: 'A full hall on Sunday: the congregation lifts their hands as the worship team leads from the stage beneath “JESUS” signs.',
    },
  },
  sundayWorshipStage: {
    src: sundayWorshipStage,
    alt: {
      sw: 'Timu ya sifa ikiongoza kutoka jukwaani huku kusanyiko likiwa limesimama kati ya safu za viti vyekundu.',
      en: 'The worship team leads from the stage while the congregation stands among rows of red chairs.',
    },
  },
  childrenPraying: {
    src: childrenPraying,
    alt: {
      sw: 'Mvulana mdogo amepiga magoti akiwa ameshika mikono akiomba, kando ya mwanamume aliyeinama juu ya kiti.',
      en: 'A young boy kneels with his hands clasped in prayer beside a man bowed over a chair.',
    },
  },
  prayerBowed: {
    src: prayerBowedPoster,
    alt: {
      sw: 'Mwanamke aliyevaa bluu ameinamisha kichwa juu ya kiti akiomba.',
      en: 'A woman in blue bows her head over a chair in prayer.',
    },
  },
  prayerKneelingMoment: {
    src: prayerKneelingPoster,
    alt: {
      sw: 'Kijana amepiga magoti kati ya viti, mikono imeshikana akiomba.',
      en: 'A young man kneels between the chairs, hands clasped in prayer.',
    },
  },
  prayerCircle: {
    src: prayerCirclePoster,
    alt: {
      sw: 'Waumini wamesimama wakishikana mikono wakiomba kati ya safu za viti.',
      en: 'Members stand holding hands in prayer between rows of chairs.',
    },
  },
  sundayWelcome: {
    src: sundayWelcome,
    alt: {
      sw: 'Mwanamume aliyevaa shati la bluu akitabasamu na kumsalimu mwanamke kwa mkono baada ya ibada.',
      en: 'A man in a light blue shirt smiles and shakes hands with a woman after the service.',
    },
  },
  sundayHallBack: {
    src: sundayHallBack,
    alt: {
      sw: 'Ukumbi mzima umejaa waumini waliosimama wakiabudu, ukitazamwa kutoka nyuma.',
      en: 'The full hall seen from the back, with the congregation standing in worship.',
    },
  },
  sundayPrayer: {
    src: sundayPrayerPoster,
    alt: {
      sw: 'Wanaume wawili wakiomba pamoja, vichwa vimeinama, kabla ya ibada ya Jumapili.',
      en: 'Two men pray together, heads bowed, before the Sunday service.',
    },
  },
} satisfies Record<string, Raw<Photo>>;

const stories: Raw<Story>[] = [
  {
    photo: photos.worshipHandsRaised,
    caption: {
      sw: 'Kila Jumapili, kwapamoja tunainua sauti zetu kumuabudu na kumtukuza Mungu.',
      en: 'Every Sunday, voices from across the city lift one song. Swahili, English, and everything in between.',
    },
  },
  {
    photo: photos.prayerBowed,
    moment: { src: '/videos/moments/prayer-bowed.mp4', position: '55% 12%' },
    quote: { sw: 'Mahali pa kukubalika,\nhata kabla ya kuamini', en: 'A place to belong,\nbefore you believe' },
    caption: {
      sw: 'Katika maombi tunainua mikono yetu tukikuabudu Mungu.',
      en: 'In prayer we lay everything down, and find that we are carried.',
    },
  },
  {
    photo: photos.prayerKneelingMoment,
    moment: { src: '/videos/moments/prayer-kneeling.mp4', position: '50% 60%' },
    quote: { sw: 'Imani yenye \nUshuda', en: 'Faith that shows up\nin ordinary places' },
  },
  {
    photo: photos.worshipTeam,
    caption: {
      sw: 'Nafasi ya kuwa na ibada na sifa.',
      en: 'A chance to have an impactful worship and praise session.',
    },
  },
];

const events: Raw<EventItem>[] = [
  {
    title: { sw: 'Maombi na Kufunga', en: 'Prayer & Fasting' },
    subtitle: 'Grand Finale 2026',
    photo: photos.prayerCircle,
    moment: { src: '/videos/moments/prayer-circle.mp4' },
    category: { sw: 'Maombi', en: 'Prayer' },
    tags: [
      { sw: 'Siku 40', en: '40 days' },
      { sw: '26 Okt – 18 Des', en: '26 Oct – 18 Dec' },
    ],
    when: [
      { sw: 'Jumatatu – Alhamisi · saa 11 jioni – 2 usiku', en: 'Mon–Thu · 17:00–20:00' },
      { sw: 'Ijumaa · saa 3 usiku – 11 alfajiri (usiku kucha)', en: 'Fri · 21:00–05:00 overnight' },
    ],
    place: { sw: 'Chumba cha Maombi, Kisutu Girls High School', en: 'Prayer Room, Kisutu Girls High School' },
    online: { url: 'https://us02web.zoom.us/j/83444042651', meetingId: '834 4404 2651', passcode: '946985' },
    endDate: '2026-12-18',
    schedule: [
      { startDate: '2026-10-26', endDate: '2026-12-18', byDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], startTime: '17:00', endTime: '20:00' },
      { startDate: '2026-10-30', endDate: '2026-12-18', byDay: ['Friday'], startTime: '21:00', endTime: '05:00' },
    ],
  },
  {
    title: { sw: 'Maombi ya Jumapili', en: 'Sunday Morning Prayer' },
    subtitle: { sw: 'Kabla ya ibada', en: 'Before the service' },
    photo: photos.sundayPrayer,
    moment: { src: '/videos/moments/sunday-prayer.mp4', position: '50% 35%' },
    category: { sw: 'Maombi', en: 'Prayer' },
    tags: [{ sw: 'Kila Jumapili', en: 'Every Sunday' }],
    when: [{ sw: 'Jumapili · saa 2 – 4 asubuhi', en: 'Sunday · 08:00–10:00' }],
    place: { sw: 'Ukumbi wa Kisutu', en: 'Kisutu Hall' },
    schedule: [{ startDate: '2025-01-05', byDay: ['Sunday'], startTime: '08:00', endTime: '10:00' }],
  },
];

const photoStrip: Raw<Photo>[] = [
  photos.sundayWelcome,
  photos.youthFellowship,
  photos.sundayHallBack,
  photos.congregationWorship,
  photos.sundayWorshipStage,
];

const ministries: Raw<Ministry>[] = [
  {
    title: { sw: 'Idara ya Wanaume', en: "Men's Ministry" },
    description: {
      sw: 'Wanaume wakikua pamoja katika imani, nyumbani, kazini na kanisani.',
      en: 'Men growing in faith together, at home, at work and in the church.',
    },
    photo: photos.mensFellowship,
    moment: { src: '/videos/moments/mens-fellowship.mp4' },
  },
  {
    title: { sw: 'Women of Wisdom', en: 'Women of Wisdom' },
    description: {
      sw: 'Akina mama wakitiana moyo katika maombi na Neno.',
      en: 'Mothers encouraging one another in prayer and the Word.',
    },
    photo: photos.womenOfWisdom,
  },
  {
    title: { sw: 'Daughters of Faith', en: 'Daughters of Faith' },
    description: {
      sw: 'Wanawake vijana wakikua pamoja katika imani, usafi na kusudi.',
      en: 'Young women growing together in faith, purity and purpose.',
    },
    photo: photos.daughtersOfFaith,
  },
  {
    title: { sw: 'Youth with Purpose', en: 'Youth with Purpose' },
    description: {
      sw: 'Imani, urafiki na kusudi kwa kizazi kijacho.',
      en: 'Faith, friendship and purpose for the next generation.',
    },
    photo: photos.fellowshipGathering,
    moment: { src: '/videos/moments/fellowship-gathering.mp4' },
  },
  {
    title: { sw: 'Idara ya Maombi', en: 'Prayer Ministry' },
    description: {
      sw: 'Tukisimama pamoja katika maombi kwa ajili ya kanisa, familia zetu na jiji letu.',
      en: 'Standing together in prayer for the church, our families and our city.',
    },
    photo: photos.prayerKneeling,
  },
  {
    title: { sw: 'Destiny Fighters', en: 'Destiny Fighters' },
    description: {
      sw: 'Mafundisho ya Biblia, ibada na malezi kwa watoto wetu.',
      en: 'Bible teaching, worship and care for our youngest.',
    },
    photo: photos.destinyFighters,
  },
];

const pastor: Raw<Pastor> = {
  name: { sw: 'Mchungaji Carlos Kirimbai', en: 'Pastor Carlos Kirimbai' },
  title: {
    sw: 'Mchungaji Kiongozi, Manna Tabernacle Bible Church',
    en: 'Senior Pastor, Manna Tabernacle Bible Church',
  },
  bio: {
    sw: 'Mchungaji Carlos Kirimbai anaamini kwamba Mungu amemwita kufundisha Mwili wa Kristo, wito anaoushikilia kutoka Isaya 45:13. Mbali na kuiongoza MTBC, hufundisha semina za Biblia na kuhudumu katika vyuo vya elimu ya juu.',
    en: 'Pastor Carlos Kirimbai believes God has called him to teach the Body of Christ, a calling he holds to from Isaiah 45:13. Alongside leading MTBC, he teaches Bible seminars and speaks at institutions of higher learning.',
  },
  instagram: { handle: '@carloskirimbai', url: pastorInstagram },
  youtube: { handle: '@carloskirimbai', url: youtube, channelId: 'UCY2Bpc2UZqd_4Px-B7ZuhtQ' },
  podcast: { live: false, url: '' },
  portrait: {
    src: pastorPortrait,
    alt: {
      sw: 'Mchungaji Carlos Kirimbai, aliyevaa shati la kijani, akizungumza kwa kipaza sauti kwenye mimbari.',
      en: 'Pastor Carlos Kirimbai, in a green shirt, speaks into a microphone at the lectern.',
    },
  },
  preaching: { src: pastorPreaching, alt: '' },
  latestMessage: { sw: 'Mkate wa Safari — Sehemu ya 1', en: 'Bread for the Journey — Part 1' },
};

const news: Raw<NewsPost>[] = [
  {
    date: '2026-10-28',
    tag: { sw: 'Taarifa', en: 'Notice' },
    title: { sw: 'Muda wa ibada za Krismasi umethibitishwa', en: 'Christmas service times are now confirmed' },
  },
  {
    date: '2026-10-26',
    tag: { sw: 'Tukio', en: 'Event' },
    title: {
      sw: 'Maombi na Kufunga, Grand Finale: siku 40, 26 Okt – 18 Des',
      en: 'Prayer & Fasting Grand Finale: 40 days, 26 Oct – 18 Dec',
    },
  },
  {
    date: '2026-10-14',
    tag: { sw: 'Uinjilisti', en: 'Outreach' },
    title: { sw: 'Asante kwa Jumapili ya Vijana iliyobarikiwa', en: 'Thank you for a wonderful Youth Sunday' },
  },
  {
    date: '2026-09-30',
    tag: { sw: 'Mahubiri', en: 'Sermon' },
    title: { sw: 'Mfululizo mpya unaanza: “Mkate wa Safari”', en: 'New series begins: “Bread for the Journey”' },
  },
];

/* ------------------------------------------------------------------ */
/* Access                                                              */
/* ------------------------------------------------------------------ */

/** Events whose end date hasn't passed yet, judged in Dar es Salaam time at build. */
const isCurrent = (event: { endDate?: string | undefined }, now: Date) => {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Dar_es_Salaam' }).format(now);
  return !event.endDate || event.endDate >= today;
};

/** All content in one language. */
export const getContent = (lang: Lang, now = new Date()) => ({
  site: localize<Site>(site, lang),
  photos: localize<Record<keyof typeof photos, Photo>>(photos, lang),
  stories: localize<Story[]>(stories, lang),
  events: localize<EventItem[]>(events, lang).filter((event) => isCurrent(event, now)),
  photoStrip: localize<Photo[]>(photoStrip, lang),
  ministries: localize<Ministry[]>(ministries, lang),
  pastor: localize<Pastor>(pastor, lang),
  news: localize<NewsPost[]>(news, lang),
});

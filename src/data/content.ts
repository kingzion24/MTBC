/**
 * Static site content, seeded exactly as it appears in Figma.
 * Phase 3 replaces this module with Sanity queries that return the same shapes.
 */
import type { ImageMetadata } from 'astro';

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

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

const address = 'Kisutu Primary School Hall, Posta Mpya, Dar es Salaam';

export const site = {
  serviceTime: '10:00 – 13:00',
  serviceShort: 'Sundays 10:00',
  venue: 'Kisutu Hall',
  address,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  phone: { display: '+255 700 000 000', tel: '+255700000000' },
  officeHours: 'Office hours 9:00 – 17:00 · Closed Mondays',
  instagram: 'https://www.instagram.com/carloskirimbai/',
  youtube: 'https://www.youtube.com/channel/UCY2Bpc2UZqd_4Px-B7ZuhtQ',
} as const;

export const photos = {
  worshipHandsRaised: {
    src: worshipHandsRaised,
    alt: 'Young people in the congregation lift their hands in worship beside an open window.',
  },
  prayerKneeling: {
    src: prayerKneeling,
    alt: 'Members kneel with their foreheads to the floor in prayer.',
  },
  congregationWorship: {
    src: congregationWorship,
    alt: 'The congregation stands with hands raised in front of the stage and lyrics screen.',
  },
  worshipTeam: {
    src: worshipTeam,
    alt: 'Two worship leaders sing into microphones on stage, in black and white.',
  },
  youthFellowship: {
    src: youthFellowship,
    alt: 'Young people sing and clap together during Youth Fellowship.',
  },
  fellowshipGreeting: {
    src: fellowshipGreeting,
    alt: 'Two women share a smile and clasp hands between rows of chairs after the service.',
  },
  youngProfessionals: {
    src: youngProfessionals,
    alt: 'A woman in a white blouse sits listening among rows of red and gold chairs.',
  },
  womenOfGrace: {
    src: womenOfGrace,
    alt: 'A woman in a pink patterned dress prays with her eyes closed.',
  },
  contactPreacher: {
    src: contactPreacher,
    alt: 'A preacher raises his arms on stage as the congregation lifts their hands.',
  },
  sundayServiceHall: {
    src: sundayServiceHall,
    alt: 'A full hall on Sunday: the congregation lifts their hands as the worship team leads from the stage beneath “JESUS” signs.',
  },
  sundayWorshipStage: {
    src: sundayWorshipStage,
    alt: 'The worship team leads from the stage while the congregation stands among rows of red chairs.',
  },
  childrenPraying: {
    src: childrenPraying,
    alt: 'A young boy kneels with his hands clasped in prayer beside a man bowed over a chair.',
  },
  prayerBowed: { src: prayerBowedPoster, alt: 'A woman in blue bows her head over a chair in prayer.' },
  prayerKneelingMoment: {
    src: prayerKneelingPoster,
    alt: 'A young man kneels between the chairs, hands clasped in prayer.',
  },
  prayerCircle: {
    src: prayerCirclePoster,
    alt: 'Members stand holding hands in prayer between rows of chairs.',
  },
} satisfies Record<string, Photo>;

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

export const stories: Story[] = [
  {
    photo: photos.worshipHandsRaised,
    caption: 'Every Sunday, voices from across the city lift one song. Swahili, English, and everything in between.',
  },
  {
    photo: photos.prayerBowed,
    moment: { src: '/videos/moments/prayer-bowed.mp4', position: '55% 12%' },
    quote: 'A place to belong,\nbefore you believe',
    caption: 'In prayer we lay everything down, and find that we are carried.',
  },
  {
    photo: photos.prayerKneelingMoment,
    moment: { src: '/videos/moments/prayer-kneeling.mp4', position: '50% 60%' },
    quote: 'Faith that shows up\nin ordinary places',
  },
  {
    photo: photos.worshipTeam,
    caption: 'Our worship team leads us in song every Sunday, in Swahili and English.',
  },
];

export interface OnlineMeeting {
  /** Zoom join link. The passcode is shown separately so it can be typed in. */
  url: string;
  meetingId: string;
  passcode: string;
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
}

export const events: EventItem[] = [
  {
    title: 'Prayer & Fasting',
    subtitle: 'Grand Finale 2026',
    photo: photos.prayerCircle,
    moment: { src: '/videos/moments/prayer-circle.mp4' },
    category: 'Prayer',
    tags: ['40 days', '26 Oct – 18 Dec'],
    when: ['Mon–Thu · 17:00–20:00', 'Fri · 21:00–05:00 overnight'],
    place: 'Prayer Room, Kisutu Girls High School',
    online: { url: 'https://us02web.zoom.us/j/83444042651', meetingId: '834 4404 2651', passcode: '946985' },
    endDate: '2026-12-18',
  },
];

/** Events whose end date hasn't passed yet, judged in Dar es Salaam time at build. */
export const currentEvents = (now = new Date()): EventItem[] => {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Dar_es_Salaam' }).format(now);
  return events.filter((event) => !event.endDate || event.endDate >= today);
};

export const photoStrip: Photo[] = [
  photos.prayerKneeling,
  photos.youthFellowship,
  photos.fellowshipGreeting,
  photos.congregationWorship,
  photos.sundayWorshipStage,
];

export interface Ministry {
  title: string;
  /** One line. Draft copy until the church confirms it. */
  description: string;
  photo: Photo;
  /** Optional details shown as tags, e.g. "Kisutu Hall", "Sat 08:00". */
  tags?: string[];
}

export const ministries: Ministry[] = [
  {
    title: "Men's Ministry",
    description: 'Men growing in faith together, at home, at work and in the church.',
    photo: photos.worshipTeam,
  },
  {
    title: "Mothers' Ministry",
    description: 'Mothers encouraging one another in prayer and the Word.',
    photo: photos.womenOfGrace,
  },
  {
    title: 'Young Adults',
    description: 'Faith, friendship and purpose for the next generation.',
    photo: photos.youngProfessionals,
  },
  {
    title: 'Prayer Ministry',
    description: 'Standing together in prayer for the church, our families and our city.',
    photo: photos.prayerKneeling,
  },
  {
    title: "Children's Ministry",
    description: 'Bible teaching, worship and care for our youngest.',
    photo: photos.childrenPraying,
  },
];

export const pastor = {
  name: 'Pastor Carlos Kirimbai',
  title: 'Senior Pastor, Manna Tabernacle Bible Church',
  bio: 'Pastor Carlos Kirimbai believes God has called him to teach the Body of Christ, a calling he holds to from Isaiah 45:13. Alongside leading MTBC, he teaches Bible seminars and speaks at institutions of higher learning.',
  instagram: { handle: '@carloskirimbai', url: site.instagram },
  youtube: { handle: '@carloskirimbai', url: site.youtube, channelId: 'UCY2Bpc2UZqd_4Px-B7ZuhtQ' },
  podcast: { live: false, url: '' },
  portrait: {
    src: pastorPortrait,
    alt: 'Pastor Carlos Kirimbai, in a green shirt, speaks into a microphone at the lectern.',
  },
  /** Fallback image and title for the latest-message block if the YouTube feed can't be read at build. */
  preaching: { src: pastorPreaching, alt: '' },
  latestMessage: 'Bread for the Journey — Part 1',
} as const;

export interface NewsPost {
  date: string; // ISO yyyy-mm-dd
  tag: string;
  title: string;
}

export const news: NewsPost[] = [
  { date: '2026-10-28', tag: 'Notice', title: 'Christmas service times are now confirmed' },
  { date: '2026-10-26', tag: 'Event', title: 'Prayer & Fasting Grand Finale: 40 days, 26 Oct – 18 Dec' },
  { date: '2026-10-14', tag: 'Outreach', title: 'Thank you for a wonderful Youth Sunday' },
  { date: '2026-09-30', tag: 'Sermon', title: 'New series begins: “Bread for the Journey”' },
];

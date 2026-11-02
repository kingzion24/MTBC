/**
 * Static site content, seeded exactly as it appears in Figma.
 * Phase 3 replaces this module with Sanity queries that return the same shapes.
 */
import type { ImageMetadata } from 'astro';

import worshipHandsRaised from '../assets/photos/worship-hands-raised.jpg';
import prayerKneeling from '../assets/photos/prayer-kneeling.jpg';
import congregationWorship from '../assets/photos/congregation-worship.jpg';
import worshipTeam from '../assets/photos/worship-team.jpg';
import prayerRoom from '../assets/photos/prayer-room.png';
import youthFellowship from '../assets/photos/youth-fellowship.jpg';
import fellowshipGreeting from '../assets/photos/fellowship-greeting.jpg';
import youngProfessionals from '../assets/photos/young-professionals.jpg';
import womenOfGrace from '../assets/photos/women-of-grace.jpg';
import contactPreacher from '../assets/photos/contact-preacher.jpg';

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
  prayerRoom: {
    src: prayerRoom,
    alt: 'A woman lifts her hands toward a screen that reads “MTBC Prayer Room”.',
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
} satisfies Record<string, Photo>;

export interface Story {
  photo: Photo;
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
    photo: photos.prayerKneeling,
    quote: 'A place to belong,\nbefore you believe',
    caption: 'In prayer we lay everything down, and find that we are carried.',
  },
  {
    photo: photos.congregationWorship,
    quote: 'Faith that shows up\nin ordinary places',
  },
  {
    photo: photos.worshipTeam,
    caption: 'Our worship team leads us in song every Sunday, in Swahili and English.',
  },
];

export interface EventItem {
  title: string;
  subtitle: string;
  photo: Photo;
  category: string;
  tags: string[];
  when: string;
  place: string;
}

export const events: EventItem[] = [
  {
    title: 'MTBC Prayer Room',
    subtitle: 'An evening of prayer together',
    photo: photos.prayerRoom,
    category: 'Prayer',
    tags: ['Weekly', 'Open to all'],
    when: 'Every Wednesday · 18:00',
    place: 'Kisutu Hall',
  },
  {
    title: 'Youth Fellowship',
    subtitle: 'Worship, Word and real talk',
    photo: photos.youthFellowship,
    category: 'Youth',
    tags: ['Music'],
    when: 'Every Friday · 18:30',
    place: 'Kisutu Hall',
  },
];

export const photoStrip: Photo[] = [
  photos.prayerKneeling,
  photos.youthFellowship,
  photos.fellowshipGreeting,
  photos.congregationWorship,
  photos.youngProfessionals,
];

export const ministryCategories = ['Small Groups', 'Serve Teams', 'Care & Prayer'] as const;
export type MinistryCategory = (typeof ministryCategories)[number];

export interface Ministry {
  title: string;
  description: string;
  photo: Photo;
  category: MinistryCategory;
  place: string;
  time: string;
}

export const ministries: Ministry[] = [
  {
    title: 'Young Professionals',
    description: 'Faith, career and friendship over dinner.',
    photo: photos.youngProfessionals,
    category: 'Small Groups',
    place: 'Kisutu Hall',
    time: 'Tue 19:00',
  },
  {
    title: 'Women of Grace',
    description: 'Bible study and mutual encouragement.',
    photo: photos.womenOfGrace,
    category: 'Small Groups',
    place: 'Kisutu Hall',
    time: 'Wed 18:00',
  },
  {
    title: "Men's Breakfast",
    description: 'Coffee, scripture and honest conversation.',
    photo: photos.worshipTeam,
    category: 'Small Groups',
    place: 'Kisutu Hall',
    time: 'Sat 08:00',
  },
];

export const pastor = {
  name: 'Pastor Carlos Kirimbai',
  title: 'Senior Pastor, Manna Tabernacle Bible Church',
  bio: 'Pastor Carlos Kirimbai believes God has called him to teach the Body of Christ, a calling he holds to from Isaiah 45:13. Alongside leading MTBC, he teaches Bible seminars and speaks at institutions of higher learning.',
  instagram: { handle: '@carloskirimbai', url: site.instagram },
  youtube: { handle: '@carloskirimbai', url: site.youtube },
  podcast: { live: false, url: '' },
  latestMessage: 'Bread for the Journey — Part 1',
} as const;

export interface NewsPost {
  date: string; // ISO yyyy-mm-dd
  tag: string;
  title: string;
}

export const news: NewsPost[] = [
  { date: '2026-10-28', tag: 'Notice', title: 'Christmas service times are now confirmed' },
  { date: '2026-10-14', tag: 'Outreach', title: 'Thank you for a wonderful Youth Sunday' },
  { date: '2026-09-30', tag: 'Sermon', title: 'New series begins: “Bread for the Journey”' },
];

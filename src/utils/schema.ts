export interface BreadcrumbItem {
  name: string;
  url: string; // absolute
}

export interface EventScheduleInput {
  startDate: string;        // 'yyyy-mm-dd'
  endDate?: string;         // 'yyyy-mm-dd', optional
  byDay: string[];          // full English weekday names: 'Monday' .. 'Sunday'
  startTime: string;        // 'HH:mm'
  endTime: string;          // 'HH:mm'
}

export interface EventSchemaInput {
  title: string;
  subtitle?: string;
  place: string;
  online?: { url: string };
  schedule?: EventScheduleInput[];
}

export interface EventSchemaOptions {
  image: string;            // absolute image URL
  organizerId: string;      // the church node @id, e.g. 'https://host/#church'
  timeZone: string;         // IANA, e.g. 'Africa/Dar_es_Salaam'
  addressLocality: string;  // 'Dar es Salaam'
  addressCountry: string;   // 'TZ'
}

export function websiteSchema(opts: {
  url: string;            // home URL, absolute
  name: string;
  inLanguage: string[];   // e.g. ['sw','en']
  publisherId: string;    // the church node @id
}): object {
  return {
    '@type': 'WebSite',
    '@id': `${opts.url}#website`,
    url: opts.url,
    name: opts.name,
    inLanguage: opts.inLanguage,
    publisher: { '@id': opts.publisherId },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function eventSchema(event: EventSchemaInput, opts: EventSchemaOptions): object | null {
  if (!event.schedule || event.schedule.length === 0) return null;

  const DAY_URL: Record<string, string> = {
    Monday: 'https://schema.org/Monday',
    Tuesday: 'https://schema.org/Tuesday',
    Wednesday: 'https://schema.org/Wednesday',
    Thursday: 'https://schema.org/Thursday',
    Friday: 'https://schema.org/Friday',
    Saturday: 'https://schema.org/Saturday',
    Sunday: 'https://schema.org/Sunday'
  };

  const eventSchedule = event.schedule.map(s => ({
    '@type': 'Schedule',
    startDate: s.startDate,
    ...(s.endDate ? { endDate: s.endDate } : {}),
    byDay: s.byDay.map(d => DAY_URL[d] ?? d),
    startTime: s.startTime,
    endTime: s.endTime,
    repeatFrequency: 'P1W',
    scheduleTimezone: opts.timeZone,
  }));

  const location: object[] = [{
    '@type': 'Place',
    name: event.place,
    address: {
      '@type': 'PostalAddress',
      addressLocality: opts.addressLocality,
      addressCountry: opts.addressCountry,
    },
  }];

  if (event.online) location.push({ '@type': 'VirtualLocation', url: event.online.url });

  const eventAttendanceMode = event.online
    ? 'https://schema.org/MixedEventAttendanceMode'
    : 'https://schema.org/OfflineEventAttendanceMode';

  return {
    '@type': 'Event',
    name: event.title,
    ...(event.subtitle ? { description: event.subtitle } : {}),
    image: [opts.image],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode,
    organizer: { '@id': opts.organizerId },
    location,
    eventSchedule,
  };
}
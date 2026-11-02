import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'serviceTime', title: 'Sunday service time', type: 'string', description: 'Shown in the header and hero, e.g. “10:00 – 13:00”.', validation: (r) => r.required() }),
    defineField({ name: 'serviceShort', title: 'Short service time', type: 'string', description: 'Used in the Visit Us list, e.g. “Sundays 10:00”.', validation: (r) => r.required() }),
    defineField({ name: 'venue', title: 'Venue name', type: 'string', description: 'e.g. “Kisutu Hall”.', validation: (r) => r.required() }),
    defineField({ name: 'address', title: 'Full address', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'mapUrl', title: 'Google Maps link', type: 'url', description: 'Opened by “Plan your visit” and the Google Map links.', validation: (r) => r.required() }),
    defineField({ name: 'phoneDisplay', title: 'Phone (as shown)', type: 'string', description: 'e.g. “+255 700 000 000”.', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Phone (for dialling)', type: 'string', description: 'Digits only with country code, e.g. “+255700000000”. Used by “Request prayer”.', validation: (r) => r.required().regex(/^\+\d{8,15}$/, { name: 'phone number' }) }),
    defineField({ name: 'officeHours', title: 'Office hours', type: 'string', description: 'Shown under the phone number.' }),
    defineField({ name: 'instagramUrl', title: 'Instagram link', type: 'url' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube link', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});

import { defineField, defineType } from 'sanity';
import { imageWithAlt } from './image';

const channel = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'handle', title: 'Handle', type: 'string', description: 'e.g. “@carloskirimbai”.', validation: (r) => r.required() }),
      defineField({ name: 'url', title: 'Link', type: 'url', validation: (r) => r.required() }),
    ],
  });

export const pastor = defineType({
  name: 'pastor',
  title: 'Head Pastor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Role', type: 'string', description: 'e.g. “Senior Pastor, Manna Tabernacle Bible Church”.', validation: (r) => r.required() }),
    defineField({ name: 'bio', title: 'Short bio', type: 'text', rows: 4, validation: (r) => r.required().max(600) }),
    imageWithAlt('portrait', 'Portrait', 'Portrait photo (upright). Until one is added, a neutral placeholder is shown.', false),
    channel('instagram', 'Instagram'),
    channel('youtube', 'YouTube'),
    defineField({ name: 'youtubeChannelId', title: 'YouTube channel ID', type: 'string', description: 'Starts with “UC”. Used to show the latest message automatically.', validation: (r) => r.required().regex(/^UC[\w-]{22}$/, { name: 'channel ID' }) }),
    defineField({
      name: 'podcast',
      title: 'Spotify podcast',
      type: 'object',
      fields: [
        defineField({ name: 'url', title: 'Spotify link', type: 'url', description: 'Add the show link when the podcast launches.' }),
        defineField({ name: 'live', title: 'Podcast is live', type: 'boolean', initialValue: false, description: 'Turn on to replace “Coming soon” with a Listen link.' }),
      ],
      validation: (r) => r.custom((v: { url?: string; live?: boolean } | undefined) => (v?.live && !v.url ? 'Add the Spotify link before marking the podcast live.' : true)),
    }),
  ],
});

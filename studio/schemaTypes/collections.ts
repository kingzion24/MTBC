import { defineField, defineType } from 'sanity';
import { imageWithAlt } from './image';

const order = defineField({ name: 'order', title: 'Display order', type: 'number', description: 'Lower numbers show first.', initialValue: 10 });
const byOrder = [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' as const }] }];

export const story = defineType({
  name: 'story',
  title: 'Life Together story',
  type: 'document',
  description: 'The first four appear in the home page collage.',
  fields: [
    imageWithAlt('image', 'Photo', 'A moment from church life.'),
    defineField({ name: 'quote', title: 'Large italic line', type: 'text', rows: 2, description: 'Optional. Press Enter to choose where the line breaks.' }),
    defineField({ name: 'caption', title: 'Caption', type: 'text', rows: 3, description: 'Optional small text under the photo.', validation: (r) => r.max(200) }),
    order,
  ],
  orderings: byOrder,
  preview: { select: { title: 'quote', subtitle: 'caption', media: 'image' } },
});

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  description: 'The first two appear on the home page; all appear on /events.',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', description: 'e.g. “An evening of prayer together”.' }),
    imageWithAlt('image', 'Photo', 'Landscape photo for the card.'),
    defineField({ name: 'category', title: 'Main tag', type: 'string', description: 'Highlighted tag, e.g. “Prayer”.', validation: (r) => r.required() }),
    defineField({ name: 'tags', title: 'Other tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'schedule', title: 'When', type: 'string', description: 'e.g. “Every Wednesday · 18:00”.', validation: (r) => r.required() }),
    defineField({ name: 'place', title: 'Where', type: 'string', initialValue: 'Kisutu Hall', validation: (r) => r.required() }),
    order,
  ],
  orderings: byOrder,
  preview: { select: { title: 'title', subtitle: 'schedule', media: 'image' } },
});

export const ministryCategories = ['Small Groups', 'Serve Teams', 'Care & Prayer'];

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'One-line description', type: 'string', validation: (r) => r.required().max(90) }),
    defineField({ name: 'category', title: 'Tab', type: 'string', options: { list: ministryCategories, layout: 'radio' }, validation: (r) => r.required() }),
    imageWithAlt('image', 'Photo', 'Photo for the card.'),
    defineField({ name: 'place', title: 'Where', type: 'string', initialValue: 'Kisutu Hall', validation: (r) => r.required() }),
    defineField({ name: 'time', title: 'When', type: 'string', description: 'Short, e.g. “Tue 19:00”.', validation: (r) => r.required() }),
    order,
  ],
  orderings: byOrder,
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
});

export const newsPost = defineType({
  name: 'newsPost',
  title: 'News post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string', validation: (r) => r.required().max(90) }),
    defineField({ name: 'date', title: 'Date', type: 'date', initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({ name: 'tag', title: 'Tag', type: 'string', options: { list: ['Notice', 'Outreach', 'Sermon', 'Event'] }, validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'date' } },
});

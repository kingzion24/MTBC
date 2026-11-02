import { defineField } from 'sanity';

/** Image field with hotspot and a required description for screen readers. */
export const imageWithAlt = (name: string, title: string, description: string, required = true) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Describe the photo for people who can’t see it, e.g. “Members kneel in prayer”.',
        validation: (rule) => rule.required().max(160),
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  });

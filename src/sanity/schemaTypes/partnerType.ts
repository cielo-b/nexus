import { defineField, defineType } from 'sanity'

export const partnerType = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Alt text for accessibility',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Optional link to partner website',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})

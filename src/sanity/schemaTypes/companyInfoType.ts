import { defineField, defineType } from 'sanity'

export const companyInfoType = defineType({
  name: 'companyInfo',
  title: 'Company Information',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Information Type',
      type: 'string',
      options: {
        list: [
          { title: 'Vision', value: 'vision' },
          { title: 'Mission', value: 'mission' },
          { title: 'Goals', value: 'goals' },
          { title: 'Beliefs', value: 'beliefs' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this information on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
    },
    prepare(selection) {
      const { title, type, media } = selection
      return {
        title: `${title} (${type.charAt(0).toUpperCase() + type.slice(1)})`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Type then Order',
      name: 'typeOrder',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})

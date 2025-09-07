import { defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
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
      description: 'Show this FAQ on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection) {
      const { title, order } = selection
      return {
        title: `${title} (Order: ${order || 0})`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})

import { defineField, defineType } from 'sanity'

export const careerOfferType = defineType({
  name: 'careerOffer',
  title: 'Career Offer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Offer Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji (e.g., "refresh", "pencil", "trending-up", "infinity")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Emoji', value: 'emoji' },
          { title: 'Heroicon', value: 'heroicon' },
          { title: 'Custom SVG', value: 'svg' },
        ],
      },
      initialValue: 'emoji',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Offer',
      type: 'boolean',
      description: 'Show this offer prominently',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this offer on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      iconType: 'iconType',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, icon, iconType, featured } = selection
      const iconDisplay = iconType === 'emoji' ? icon : `[${icon}]`
      return {
        title: featured ? `${title} (Featured)` : title,
        subtitle: `Icon: ${iconDisplay}`,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})

import { defineField, defineType } from 'sanity'

export const coreValueType = defineType({
  name: 'coreValue',
  title: 'Core Value',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Value Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji (e.g., "star", "heart", "shield", "lightbulb", "users", "check-circle")',
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
      name: 'color',
      title: 'Icon Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Indigo', value: 'indigo' },
          { title: 'Pink', value: 'pink' },
        ],
      },
      initialValue: 'blue',
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
      title: 'Featured Value',
      type: 'boolean',
      description: 'Show this value prominently',
      initialValue: false,
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

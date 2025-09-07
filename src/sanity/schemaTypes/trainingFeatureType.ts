import { defineField, defineType } from 'sanity'

export const trainingFeatureType = defineType({
  name: 'trainingFeature',
  title: 'Training Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji for the feature',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Our Trainings', value: 'our-trainings' },
          { title: 'Why Choose Us', value: 'why-choose-us' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this feature appears (lower number first)',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Feature',
      type: 'boolean',
      description: 'Show this feature prominently',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this feature on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      section: 'section',
      icon: 'icon',
      iconType: 'iconType',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, section, icon, iconType, featured } = selection
      const iconDisplay = iconType === 'emoji' ? icon : `[${icon}]`
      return {
        title: featured ? `${title} (Featured)` : title,
        subtitle: `${section} • ${iconDisplay}`,
      }
    },
  },
  orderings: [
    {
      title: 'Section, then Order',
      name: 'sectionOrder',
      by: [
        { field: 'section', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})

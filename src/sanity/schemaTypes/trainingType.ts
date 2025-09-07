import { defineField, defineType } from 'sanity'

export const trainingType = defineType({
  name: 'training',
  title: 'Training Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Training Title',
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
      description: 'Icon name or emoji for the training program',
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
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'education' },
          { title: 'Agriculture', value: 'agriculture' },
          { title: 'Public Health', value: 'public-health' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "2 weeks", "3 months", "6 sessions"',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'All Levels', value: 'all-levels' },
        ],
      },
      initialValue: 'all-levels',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'In-Person', value: 'in-person' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
      },
      initialValue: 'online',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "Free", "$500", "Contact for pricing"',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      description: 'Lead instructor or trainer name',
    }),
    defineField({
      name: 'objectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What participants will learn',
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Required knowledge or skills before taking this training',
    }),
    defineField({
      name: 'certificate',
      title: 'Certificate Available',
      type: 'boolean',
      description: 'Whether a certificate is provided upon completion',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this training appears (lower number first)',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Training',
      type: 'boolean',
      description: 'Show this training prominently',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this training on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sector: 'sector',
      level: 'level',
      icon: 'icon',
      iconType: 'iconType',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, sector, level, icon, iconType, featured } = selection
      const iconDisplay = iconType === 'emoji' ? icon : `[${icon}]`
      return {
        title: featured ? `${title} (Featured)` : title,
        subtitle: `${sector} • ${level} • ${iconDisplay}`,
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

import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for service cards and listings',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description for service detail page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
      description: 'Image for service cards and listings',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji for the service',
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
      name: 'relatedPublications',
      title: 'Related Publications',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'publication' }],
        },
      ],
      description: 'Publications related to this service',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears (lower number first)',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service prominently',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this service on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'cardImage',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, media, featured } = selection
      return {
        title: featured ? `${title} (Featured)` : title,
        subtitle: subtitle,
        media: media,
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

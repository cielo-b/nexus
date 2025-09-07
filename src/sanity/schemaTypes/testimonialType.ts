import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientTitle',
      title: 'Client Title/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientImage',
      title: 'Client Photo',
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
      name: 'testimonial',
      title: 'Testimonial Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'Rating out of 5 stars',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show this testimonial prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'company',
      media: 'clientImage',
      rating: 'rating',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, media, rating, featured } = selection
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
      return {
        title: featured ? `${title} (Featured)` : title,
        subtitle: `${subtitle} - ${stars}`,
        media,
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
      title: 'Rating High to Low',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'clientName', direction: 'asc' }],
    },
  ],
})

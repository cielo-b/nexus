import { defineField, defineType } from 'sanity'

export const serviceDetailType = defineType({
  name: 'serviceDetail',
  title: 'Service Detail Section',
  type: 'document',
  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'How We Do It', value: 'howWeDoIt' },
          { title: 'Testing Expertise', value: 'testingExpertise' },
          { title: 'Our Approach', value: 'ourApproach' },
          { title: 'Methodology', value: 'methodology' },
          { title: 'Case Studies', value: 'caseStudies' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description: 'Text to highlight in a different color (e.g., "Do It" in "How We Do It")',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      description: 'Optional quote to display in the section',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
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
        }),
      ],
    }),
    defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
      description: 'Title for the image card',
    }),
    defineField({
      name: 'imageSubtitle',
      title: 'Image Subtitle',
      type: 'string',
      description: 'Subtitle for the image card',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this section appears (lower number first)',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this section on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      service: 'service.title',
      sectionType: 'sectionType',
    },
    prepare(selection) {
      const { title, service, sectionType } = selection
      return {
        title: title,
        subtitle: `${service} - ${sectionType}`,
      }
    },
  },
  orderings: [
    {
      title: 'Service, then Order',
      name: 'serviceOrder',
      by: [
        { field: 'service.title', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})

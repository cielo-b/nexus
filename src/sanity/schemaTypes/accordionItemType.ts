import { defineType } from 'sanity'

export const accordionItemType = defineType({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500)
    },
    {
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'Optional video URL for the accordion item'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility'
        }
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this item appears (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No description'
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})

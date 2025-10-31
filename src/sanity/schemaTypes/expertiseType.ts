import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'expertise',
  title: 'Expertise',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(500),
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
      name: 'coverImage',
      title: 'Cover Image',
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
      name: 'coverVideo',
      title: 'Cover Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Rich text content displayed above the services section',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required().min(10).max(500),
        }),
        defineField({
          name: 'author',
          title: 'Quote Author',
          type: 'string',
          validation: (Rule) => Rule.required().min(2).max(100),
        }),
      ],
      description: 'Optional quote to highlight the expertise area',
    }),
  ],
  validation: (Rule) => Rule.custom((doc) => {
    if (!doc || (!doc.coverImage && !doc.coverVideo)) {
      return 'Either cover image or cover video must be provided'
    }
    return true
  }),
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, description, media } = selection
      return {
        title: title,
        subtitle: description,
        media: media,
      }
    },
  },
})

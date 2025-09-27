import { defineField, defineType } from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'id',
              title: 'Section ID',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'blockContent',
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
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
      description: 'Optional video to show in hero section instead of cover image',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Economics', value: 'economics' },
          { title: 'Agriculture', value: 'agriculture' },
          { title: 'Technology', value: 'technology' },
          { title: 'Politics', value: 'politics' },
          { title: 'Health', value: 'health' },
          { title: 'Environment', value: 'environment' },
          { title: 'Sports', value: 'sports' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this blog post as featured on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'showOnRecent',
      title: 'Show on Recent',
      type: 'boolean',
      description: 'Show this blog post in the recent blogs section on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'likes',
      title: 'Likes Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'views',
      title: 'Views Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'shares',
      title: 'Shares Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category',
      media: 'coverImage',
    },
    prepare(selection) {
      const { author, category } = selection
      return { 
        ...selection, 
        subtitle: `${category}${author ? ` • ${author}` : ''}` 
      }
    },
  },
})

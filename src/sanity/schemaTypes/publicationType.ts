import { defineField, defineType } from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publication',
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
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Research Report', value: 'research-report' },
          { title: 'Policy Brief', value: 'policy-brief' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'White Paper', value: 'white-paper' },
          { title: 'Journal Article', value: 'journal-article' },
          { title: 'Working Paper', value: 'working-paper' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'Link to download the full publication (PDF, etc.)',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to external publication or journal',
    }),
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Optional service this publication is related to',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this publication as featured on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      category: 'category',
      media: 'coverImage',
    },
    prepare(selection) {
      const { authors, category } = selection
      const authorNames = authors?.map((author: any) => author.name).join(', ')
      return { 
        ...selection, 
        subtitle: `${category}${authorNames ? ` • ${authorNames}` : ''}` 
      }
    },
  },
})

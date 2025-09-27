import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'title',
      title: 'Title/Position',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'orcidId',
      title: 'ORCID ID',
      type: 'string',
      description: 'ORCID identifier (e.g., 0000-0000-0000-0000)',
      validation: (Rule) => Rule.regex(/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/, {
        name: 'ORCID ID',
        invert: false,
      }),
    }),
    defineField({
      name: 'affiliations',
      title: 'Affiliations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of institutional affiliations',
    }),
    defineField({
      name: 'researchInterests',
      title: 'Research Interests',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isCorrespondingAuthor',
      title: 'Is Corresponding Author',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})

import { defineType } from 'sanity'

export const privacyPolicyType = defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'The main content for the Privacy Policy page'
    }
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'content'
    },
    prepare(selection) {
      const { title } = selection
      const block = (title || []).find((item: any) => item._type === 'block')
      return {
        title: 'Privacy Policy',
        subtitle: block ? block.children?.find((child: any) => child._type === 'span')?.text : 'No content'
      }
    }
  }
})

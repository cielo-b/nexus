import { defineType } from 'sanity'

export const termsOfUseType = defineType({
  name: 'termsOfUse',
  title: 'Terms of Use',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'The main content for the Terms of Use page'
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
        title: 'Terms of Use',
        subtitle: block ? block.children?.find((child: any) => child._type === 'span')?.text : 'No content'
      }
    }
  }
})

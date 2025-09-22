import { defineType } from 'sanity'

export const howWeDoType = defineType({
  name: 'howWeDo',
  title: 'How We Do',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'The main content for the "How We Do" section'
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
        title: 'How We Do',
        subtitle: block ? block.children?.find((child: any) => child._type === 'span')?.text : 'No content'
      }
    }
  }
})

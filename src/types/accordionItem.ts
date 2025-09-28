export interface AccordionItem {
  _id: string
  title: string
  description: string
  video?: string
  image: {
    _id: string
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

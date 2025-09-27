export interface ExpertiseQuote {
  text: string
  author: string
}

export interface Expertise {
  _id: string
  _type: 'expertise'
  title: string
  description: string
  slug: {
    current: string
  }
  coverImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  quote?: ExpertiseQuote
}

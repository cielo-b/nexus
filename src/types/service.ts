export interface Service {
  _id: string
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  description: any[] // PortableText
  heroImage: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  cardImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  icon?: string
  iconType?: 'emoji' | 'heroicon' | 'svg'
  relatedPublications?: Array<{
    _ref: string
  }>
  order: number
  featured: boolean
  active: boolean
}

export interface ServiceDetail {
  _id: string
  service: {
    _ref: string
    title: string
  }
  sectionType: 'howWeDoIt' | 'testingExpertise' | 'ourApproach' | 'methodology' | 'caseStudies'
  title: string
  highlightedText?: string
  quote?: string
  content: any[] // PortableText
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  imageTitle?: string
  imageSubtitle?: string
  order: number
  active: boolean
}


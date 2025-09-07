export interface Service {
  _id: string
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  testingExperience?: string
  servicesType: 'mel' | 'data-collection' | 'it-assistance' | 'analytics' | 'research'
  coverImage: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  relatedPublications?: Array<{
    _ref: string
  }>
  order: number
}



export interface Training {
  _id: string
  _type: 'training'
  title: string
  slug: {
    current: string
  }
  description: string
  content?: any[] 
  coverImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  category: string
  applyLink?: string
  certificate?: boolean
  startDate?: string
  endDate?: string
  status: 'draft' | 'published' | 'archived' | 'cancelled'
}
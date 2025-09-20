export interface Training {
  _id: string
  _type: 'training'
  title: string
  slug: {
    current: string
  }
  description: string
  content?: any[] // Block content
  coverImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  category: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  format: 'in-person' | 'online' | 'hybrid' | 'self-paced'
  price?: {
    amount?: number
    currency?: 'USD' | 'RWF' | 'EUR'
    type?: 'fixed' | 'per-person' | 'per-group' | 'free'
  }
  instructor?: {
    _ref: string
    _type: 'reference'
  }
  instructors?: Array<{
    _ref: string
    _type: 'reference'
  }>
  prerequisites?: string[]
  learningObjectives?: string[]
  certificate?: boolean
  maxParticipants?: number
  minParticipants?: number
  startDate?: string
  endDate?: string
  registrationDeadline?: string
  location?: {
    name?: string
    address?: string
    city?: string
    country?: string
    onlineLink?: string
  }
  tags?: string[]
  featured?: boolean
  publishedAt: string
  status: 'draft' | 'published' | 'archived' | 'cancelled'
}
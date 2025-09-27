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
  applyLink?: string
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
export interface Training {
  _id: string
  title: string
  description: string
  icon: string
  iconType: 'emoji' | 'heroicon' | 'svg'
  sector: 'education' | 'agriculture' | 'public-health' | 'general'
  duration?: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels'
  format: 'online' | 'in-person' | 'hybrid'
  price?: string
  instructor?: string
  objectives?: string[]
  prerequisites?: string[]
  certificate: boolean
  order: number
  featured: boolean
  active: boolean
}

export interface TrainingFeature {
  _id: string
  title: string
  description: string
  icon: string
  iconType: 'emoji' | 'heroicon' | 'svg'
  section: 'our-trainings' | 'why-choose-us'
  order: number
  featured: boolean
  active: boolean
}

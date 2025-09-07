export interface CareerOffer {
  _id: string
  title: string
  description: string
  icon: string
  iconType: 'emoji' | 'heroicon' | 'svg'
  order: number
  featured: boolean
  active: boolean
}

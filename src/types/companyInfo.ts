export interface CompanyInfo {
  _id: string
  type: 'vision' | 'mission' | 'goals' | 'beliefs'
  title: string
  content: string // Simple text content
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  order: number
  active: boolean
}

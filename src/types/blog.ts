import { Author } from './author'

export interface BlogImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface BlogVideo {
  asset: {
    _id: string
    url: string
  }
  filename?: string
  size?: number
}

export interface BlogSection {
  title: string
  id: {
    current: string
  }
  content?: any[] // Portable Text content
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  tableOfContents?: BlogSection[]
  coverImage?: BlogImage
  coverVideo?: BlogVideo
  category: string
  authors: Author[]
  showOnRecent: boolean
  likes: number
  views: number
}

export interface BlogFilters {
  category: string
  search?: string
}

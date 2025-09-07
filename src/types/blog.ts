export interface BlogAuthor {
  name: string
  title?: string
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

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
  category: string
  author: BlogAuthor
  publishedAt: string
  readingTime: number
  featured: boolean
  likes: number
  views: number
  shares: number
  tags?: string[]
}

export interface BlogFilters {
  category: string
  search?: string
}

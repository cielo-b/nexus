export interface PublicationAuthor {
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

export interface PublicationSection {
  title: string
  id: {
    current: string
  }
  content?: any[] // Portable Text content
}

export interface Publication {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  tableOfContents?: PublicationSection[]
  coverImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  publicationDate: string
  author: PublicationAuthor
  category: string
  tags?: string[]
  service?: {
    _ref: string
    title?: string
  }
  downloadUrl?: string
  downloadFile?: {
    asset: {
      _ref: string
      _type: string
      url: string
    }
    filename?: string
    size?: number
  }
  externalUrl?: string
  featured: boolean
  likes: number
  views: number
}

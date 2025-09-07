export interface TeamMemberImage {
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

export interface TeamMember {
  _id: string
  name: string
  title: string
  bio?: string
  image: TeamMemberImage
  email?: string
  linkedin?: string
  twitter?: string
  order: number
  featured: boolean
  active: boolean
}

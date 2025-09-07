export interface PartnerImage {
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

export interface Partner {
  _id: string
  name: string
  logo: PartnerImage
  url?: string
  featured: boolean
  order: number
}

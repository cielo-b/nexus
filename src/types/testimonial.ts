export interface TestimonialImage {
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

export interface Testimonial {
  _id: string
  clientName: string
  clientTitle: string
  company: string
  clientImage?: TestimonialImage
  testimonial: string
  rating: number
  featured: boolean
  order: number
}

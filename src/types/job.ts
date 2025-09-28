export interface Job {
  _id: string
  _type: 'job'
  title: string
  excerpt: string
  slug: {
    current: string
    _type: 'slug'
  }
  content: any[] // Block content array
  jobLocationType: 'on-site' | 'remote' | 'hybrid'
  schedule: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
  location: string
  urlToJob: string
  status: 'draft' | 'published' | 'archived' | 'cancelled'
}


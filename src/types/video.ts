export interface Video {
  _id: string
  _type: 'video'
  title: string
  videoFile: {
    asset: {
      _ref: string
      _type: 'reference'
      url?: string
    }
    filename?: string
    size?: number
  }
  description?: string
}

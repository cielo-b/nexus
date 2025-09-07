export interface CoreValue {
  _id: string
  title: string
  description: string
  icon: string
  iconType: 'emoji' | 'heroicon' | 'svg'
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'indigo' | 'pink'
  order: number
  featured: boolean
}

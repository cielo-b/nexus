export interface Author {
  _id: string
  _type: 'author'
  name: string
  title?: string
  email?: string
  orcidId?: string
  affiliations?: string[]
  researchInterests?: string[]
  isCorrespondingAuthor?: boolean
}

export interface AuthorReference {
  _ref: string
  _type: 'reference'
}

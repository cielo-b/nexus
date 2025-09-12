import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog Posts'),
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('companyInfo').title('Company Information'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blog', 'publication', 'service',  'companyInfo', 'teamMember', 'partner', 'testimonial'].includes(item.getId()!),
      ),
    ])

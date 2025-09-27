import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog Posts'),
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('privacyPolicy').title('Privacy Policy'),
      S.documentTypeListItem('dataTransparency').title('Data Transparency Agreement'),
      S.documentTypeListItem('termsOfUse').title('Terms of Use'),
      S.documentTypeListItem('howWeDo').title('How We Do'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blog', 'publication', 'service', 'teamMember', 'partner', 'testimonial', 'privacyPolicy', 'dataTransparency', 'termsOfUse', 'howWeDo'].includes(item.getId()!),
      ),
    ])

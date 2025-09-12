import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog Posts'),
      S.documentTypeListItem('publication').title('Publications'),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('training').title('Training Programs'),
      S.documentTypeListItem('trainingFeature').title('Training Features'),
      S.divider(),
      S.documentTypeListItem('companyInfo').title('Company Information'),
      S.documentTypeListItem('coreValue').title('Core Values'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('whyChooseUs').title('Why Choose Us'),
      S.documentTypeListItem('careerOffer').title('Career Offers'),
      S.documentTypeListItem('careerTeam').title('Career Teams'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blog', 'publication', 'service', 'training', 'trainingFeature', 'companyInfo', 'coreValue', 'teamMember', 'whyChooseUs', 'careerOffer', 'careerTeam', 'partner', 'testimonial'].includes(item.getId()!),
      ),
    ])

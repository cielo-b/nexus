import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {blogType} from './blogType'
import expertiseType from './expertiseType'
import {faqType} from './faqType'
import {partnerType} from './partnerType'
import {publicationType} from './publicationType'
import {serviceType} from './serviceType'
import {teamMemberType} from './teamMemberType'
import {testimonialType} from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, expertiseType, faqType, partnerType, publicationType, serviceType, teamMemberType, testimonialType],
}

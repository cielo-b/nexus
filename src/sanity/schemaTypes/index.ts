import { type SchemaTypeDefinition } from 'sanity'

import authorType from './authorType'
import {accordionItemType} from './accordionItemType'
import {blockContentType} from './blockContentType'
import {blogType} from './blogType'
import {dataTransparencyType} from './dataTransparencyType'
import expertiseType from './expertiseType'
import {faqType} from './faqType'
import {howWeDoType} from './howWeDoType'
import {jobType} from './jobType'
import {partnerType} from './partnerType'
import {privacyPolicyType} from './privacyPolicyType'
import {publicationType} from './publicationType'
import {serviceType} from './serviceType'
import {teamMemberType} from './teamMemberType'
import {testimonialType} from './testimonialType'
import {termsOfUseType} from './termsOfUseType'
import {trainingType} from './trainingType'
import {videoType} from './videoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [accordionItemType, authorType, blockContentType, blogType, dataTransparencyType, expertiseType, faqType, howWeDoType, jobType, partnerType, privacyPolicyType, publicationType, serviceType, teamMemberType, testimonialType, termsOfUseType, trainingType, videoType],
}

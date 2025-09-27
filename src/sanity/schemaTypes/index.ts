import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {blogType} from './blogType'
import expertiseType from './expertiseType'
import {faqType} from './faqType'
import {howWeDoType} from './howWeDoType'
import {jobType} from './jobType'
import {partnerType} from './partnerType'
import {publicationType} from './publicationType'
import {serviceType} from './serviceType'
import {teamMemberType} from './teamMemberType'
import {testimonialType} from './testimonialType'
import {trainingType} from './trainingType'
import {videoType} from './videoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, expertiseType, faqType, howWeDoType, jobType, partnerType, publicationType, serviceType, teamMemberType, testimonialType, trainingType, videoType],
}

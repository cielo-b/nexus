import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {blogType} from './blogType'
import {careerOfferType} from './careerOfferType'
import {careerTeamType} from './careerTeamType'
import {companyInfoType} from './companyInfoType'
import {coreValueType} from './coreValueType'
import {faqType} from './faqType'
import {partnerType} from './partnerType'
import {publicationType} from './publicationType'
import {serviceDetailType} from './serviceDetailType'
import {serviceType} from './serviceType'
import {teamMemberType} from './teamMemberType'
import {testimonialType} from './testimonialType'
import {trainingFeatureType} from './trainingFeatureType'
import {trainingType} from './trainingType'
import {whyChooseUsType} from './whyChooseUsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, careerOfferType, careerTeamType, companyInfoType, coreValueType, faqType, partnerType, publicationType, serviceDetailType, serviceType, teamMemberType, testimonialType, trainingFeatureType, trainingType, whyChooseUsType],
}

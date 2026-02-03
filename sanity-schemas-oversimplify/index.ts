/**
 * SANITY SCHEMA TYPES
 * Import all schemas for the Oversimplify × Mentoria site
 */

import { page } from './page'
import { heroSection } from './heroSection'
import { mentoriaStrengthsSection } from './mentoriaStrengthsSection'
import { partnershipSection } from './partnershipSection'
import { servicesSection } from './servicesSection'
import { ctaSection } from './ctaSection'
import { contactSection } from './contactSection'

export const schemaTypes = [
  // Document types
  page,
  
  // Section types
  heroSection,
  mentoriaStrengthsSection,
  partnershipSection,
  servicesSection,
  ctaSection,
  contactSection,
]

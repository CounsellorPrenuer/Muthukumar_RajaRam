/**
 * SANITY SCHEMA TYPE DEFINITIONS (Remixable Template)
 * 
 * Import all schema types for the section-based page builder
 */

// Page and section schemas
import { page } from './schemas/page'
import { heroSection } from './schemas/heroSection'
import { aboutSection } from './schemas/aboutSection'
import { serviceSection } from './schemas/serviceSection'
import { testimonialSection } from './schemas/testimonialSection'
import { contactSection } from './schemas/contactSection'
import { footerSection } from './schemas/footerSection'
import { featuresSection } from './schemas/featuresSection'
import { testimonialsSection } from './schemas/testimonialsSection'
import { faqSection } from './schemas/faqSection'
import { ctaSection } from './schemas/ctaSection'

export const schemaTypes = [
  page,
  heroSection,
  aboutSection,
  serviceSection,
  testimonialSection,
  contactSection,
  footerSection,
  featuresSection,
  testimonialsSection,
  faqSection,
  ctaSection,
]

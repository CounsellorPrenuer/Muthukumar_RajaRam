/**
 * SECTION REGISTRY
 * Maps Sanity section types to React components
 */

import HeroSection from './HeroSection'
import MentoriaStrengthsSection from './MentoriaStrengthsSection'
import PartnershipSection from './PartnershipSection'
import ServicesSection from './ServicesSection'
import CTASection from './CTASection'
import ContactSection from './ContactSection'

export const sectionRegistry = {
  heroSection: HeroSection,
  mentoriaStrengthsSection: MentoriaStrengthsSection,
  partnershipSection: PartnershipSection,
  servicesSection: ServicesSection,
  ctaSection: CTASection,
  contactSection: ContactSection,
}

/**
 * Get component for a section type
 */
export function getSectionComponent(type: string) {
  return sectionRegistry[type as keyof typeof sectionRegistry] || null
}

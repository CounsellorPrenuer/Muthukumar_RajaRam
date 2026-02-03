// @ts-nocheck - Example file for reference, will work when copied to actual project with Sanity installed
import { defineType, defineField } from 'sanity'

/**
 * HERO SECTION SCHEMA
 * Main banner with branding, headline, and CTA
 */
export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'brandingLine1',
      title: 'Branding Line 1',
      type: 'string',
      description: 'e.g., "Over-Simplify Careers"',
    }),
    defineField({
      name: 'brandingLine2',
      title: 'Branding Line 2',
      type: 'string',
      description: 'e.g., "MENTORIA"',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Main headline below branding',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
    },
    prepare({ title }: { title: string }) {
      return {
        title: 'Hero Section',
        subtitle: title,
      }
    },
  },
})

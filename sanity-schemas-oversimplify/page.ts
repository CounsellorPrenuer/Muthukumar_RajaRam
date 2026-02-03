// @ts-nocheck - Example file for reference, will work when copied to actual project with Sanity installed
import { defineType, defineField } from 'sanity'

/**
 * PAGE SCHEMA
 * Main document type for all pages on the site
 */
export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (rule: any) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      description: 'Add, remove, or reorder sections to build your page',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'mentoriaStrengthsSection' },
        { type: 'partnershipSection' },
        { type: 'servicesSection' },
        { type: 'ctaSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }: { title: string; slug: string }) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})

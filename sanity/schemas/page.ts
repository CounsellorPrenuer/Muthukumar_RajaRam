import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'aboutSection' },
        { type: 'serviceSection' },
        { type: 'testimonialSection' },
        { type: 'contactSection' },
        { type: 'footerSection' },
        { type: 'featuresSection' },
        { type: 'testimonialsSection' },
        { type: 'faqSection' },
        { type: 'ctaSection' },
      ],
      options: {
        layout: 'list',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

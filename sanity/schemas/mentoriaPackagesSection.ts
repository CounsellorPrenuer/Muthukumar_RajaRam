import { defineType, defineField } from 'sanity'

export const mentoriaPackagesSection = defineType({
    name: 'mentoriaPackagesSection',
    title: 'Mentoria Packages Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Mentoria Packages',
        }),
        defineField({
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'string',
            initialValue: 'Choose the right Mentoria plan for your career growth',
        }),
        defineField({
            name: 'id',
            title: 'Section ID',
            type: 'string',
            description: 'Used for anchor links (e.g., "packages" will create #packages)',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})

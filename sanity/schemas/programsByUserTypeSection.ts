import { defineType, defineField } from 'sanity'

export const programsByUserTypeSection = defineType({
    name: 'programsByUserTypeSection',
    title: 'Programs by User Type Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Programs by User Type',
        }),
        defineField({
            name: 'programs',
            title: 'Programs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Program Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'cta',
                            title: 'CTA Text',
                            type: 'string',
                            initialValue: 'Explore Options',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'link',
                            title: 'CTA Link',
                            type: 'string',
                            initialValue: '#',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z3p2hjb6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const basePath = '/studio'

export const config = defineConfig({
    basePath,
    projectId,
    dataset,
    plugins: [structureTool()],
    schema: {
        types: schemaTypes as any,
    },
})

/**
 * SANITY CLIENT & QUERIES
 * For fetching page data
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

/**
 * Fetch a page by slug
 */
export async function getPageBySlug(slug: string) {
  const query = `
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      seo,
      sections[] {
        _key,
        _type,
        ...,
        mentoriaLogo {
          asset-> {
            url
          }
        },
        oversimplifyLogo {
          asset-> {
            url
          }
        },
        backgroundImage {
          asset-> {
            url
          }
        }
      }
    }
  `

  return sanityClient.fetch(query, { slug })
}

/**
 * Fetch all pages
 */
export async function getAllPages() {
  const query = `
    *[_type == "page"] {
      _id,
      title,
      "slug": slug.current
    }
  `

  return sanityClient.fetch(query)
}

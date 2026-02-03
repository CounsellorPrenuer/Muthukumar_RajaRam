/**
 * SANITY CLIENT CONFIGURATION
 * Initializes the Sanity client for fetching content
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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
 * Image URL builder for Sanity images
 */
const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: any) {
  return builder.image(source)
}

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
        ...
      }
    }
  `

  return sanityClient.fetch(query, { slug })
}

/**
 * Fetch all page slugs for static generation
 */
export async function getAllPageSlugs() {
  const query = `
    *[_type == "page"] {
      "slug": slug.current
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch all pages
 */
export async function getAllPages() {
  const query = `
    *[_type == "page"] {
      _id,
      title,
      slug,
      seo
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch navbar configuration
 */
export async function getNavbar() {
  const query = `
    *[_type == "navbar"][0] {
      links[] {
        label,
        href
      }
    }
  `

  return sanityClient.fetch(query)
}

/**
 * Fetch site configuration
 */
export async function getSiteConfig() {
  const query = `
    *[_type == "site"][0] {
      title,
      description,
      logo,
      logoImage {
        asset->{
          _id,
          url
        },
        alt
      },
      primaryColor,
      primaryHoverColor,
      backgroundColor,
      surfaceColor,
      textPrimary,
      textSecondary,
      borderColor,
      footerBackground,
      footerText
    }
  `

  return sanityClient.fetch(query)
}

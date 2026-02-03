/**
 * DYNAMIC PAGE RENDERER
 * Fetches page from Sanity and renders sections dynamically
 */

// @ts-ignore - These will be available when copied to the actual project
import { getSectionComponent } from '@/components/sections/registry'
import { getPageBySlug } from '@/lib/sanity'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function Page({ params }: PageProps) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <main>
      {/* SEO Metadata */}
      {page.seo && (
        <head>
          <title>{page.seo.metaTitle || page.title}</title>
          {page.seo.metaDescription && (
            <meta name="description" content={page.seo.metaDescription} />
          )}
        </head>
      )}

      {/* Render Sections */}
      {page.sections && page.sections.length > 0 ? (
        page.sections.map((section: any, idx: number) => {
          const Component = getSectionComponent(section._type)

          if (!Component) {
            console.warn(`No component found for section type: ${section._type}`)
            return null
          }

          return <Component key={section._key || idx} {...section} />
        })
      ) : (
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#999' }}>
          <p>No sections configured for this page yet.</p>
          <p>Add sections in Sanity Studio.</p>
        </div>
      )}
    </main>
  )
}

/**
 * Generate static params for all pages
 */
export async function generateStaticParams() {
  // You can implement this to fetch all page slugs from Sanity
  return []
}

/**
 * Revalidate every 60 seconds (ISR)
 */
export const revalidate = 60

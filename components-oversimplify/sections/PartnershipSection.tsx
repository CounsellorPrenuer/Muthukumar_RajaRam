/**
 * PARTNERSHIP SECTION
 * Explains the Over-Simplify × Mentoria partnership
 */

// @ts-ignore - PortableText will be available when installed in the actual project
import { PortableText } from '@portabletext/react'

interface PartnershipSectionProps {
  heading?: string
  description?: any[]
  mentoriaLogo?: any
  oversimplifyLogo?: any
}

export default function PartnershipSection({
  heading,
  description,
  mentoriaLogo,
  oversimplifyLogo,
}: PartnershipSectionProps) {
  return (
    <section
      style={{
        padding: '80px 20px',
        backgroundColor: 'white',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        {/* Logos */}
        {(oversimplifyLogo || mentoriaLogo) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            {oversimplifyLogo?.asset?.url && (
              <img
                src={oversimplifyLogo.asset.url}
                alt="Over-Simplify"
                style={{ height: '80px', objectFit: 'contain' }}
              />
            )}
            <span style={{ fontSize: '2rem', color: '#666' }}>×</span>
            {mentoriaLogo?.asset?.url && (
              <img
                src={mentoriaLogo.asset.url}
                alt="Mentoria"
                style={{ height: '80px', objectFit: 'contain' }}
              />
            )}
          </div>
        )}

        {/* Heading */}
        {heading && (
          <h2
            style={{
              fontSize: '2.5rem',
              marginBottom: '30px',
              color: '#333',
            }}
          >
            {heading}
          </h2>
        )}

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: '1.1rem',
              color: '#555',
              lineHeight: '1.8',
              textAlign: 'left',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <PortableText value={description} />
          </div>
        )}
      </div>
    </section>
  )
}

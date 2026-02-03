/**
 * CTA SECTION
 * Call-to-action for schools/institutions
 */

interface CTASectionProps {
  heading?: string
  description?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundColor?: string
}

export default function CTASection({
  heading,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundColor = '#667eea',
}: CTASectionProps) {
  return (
    <section
      style={{
        padding: '80px 20px',
        backgroundColor,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {heading && (
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
            {heading}
          </h2>
        )}

        {description && (
          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              opacity: 0.95,
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {primaryCtaText && (
            <a
              href={primaryCtaLink || '#contact'}
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                color: backgroundColor,
                padding: '15px 35px',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
              }}
            >
              {primaryCtaText}
            </a>
          )}

          {secondaryCtaText && (
            <a
              href={secondaryCtaLink || '#'}
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '15px 35px',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * HERO SECTION COMPONENT
 * Data-driven hero with joint branding
 */

interface HeroSectionProps {
  brandingLine1?: string
  brandingLine2?: string
  tagline?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: any
}

export default function HeroSection({
  brandingLine1,
  brandingLine2,
  tagline,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: backgroundImage?.asset?.url
          ? `url(${backgroundImage.asset.url})`
          : undefined,
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '60px 40px',
          borderRadius: '10px',
          maxWidth: '800px',
        }}
      >
        {/* Joint Branding */}
        {(brandingLine1 || brandingLine2) && (
          <div className="joint-branding" style={{ marginBottom: '30px' }}>
            {brandingLine1 && (
              <h1
                style={{
                  fontSize: '3rem',
                  margin: '0',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                }}
              >
                {brandingLine1}
              </h1>
            )}
            {brandingLine2 && (
              <h2
                style={{
                  fontSize: '2rem',
                  margin: '10px 0 0 0',
                  fontWeight: '600',
                  color: '#ffd700',
                }}
              >
                with {brandingLine2}
              </h2>
            )}
          </div>
        )}

        {/* Tagline */}
        {tagline && (
          <p
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              lineHeight: '1.4',
            }}
          >
            {tagline}
          </p>
        )}

        {/* Description */}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '40px', opacity: 0.9 }}>
            {description}
          </p>
        )}

        {/* CTA */}
        {ctaText && (
          <a
            href={ctaLink || '#contact'}
            style={{
              display: 'inline-block',
              backgroundColor: '#ffd700',
              color: '#000',
              padding: '15px 40px',
              borderRadius: '5px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

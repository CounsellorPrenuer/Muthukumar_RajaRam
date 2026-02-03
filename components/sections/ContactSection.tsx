'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'

export function ContactSection({ title, description, email, phone, address, formTitle, id, backgroundImage }: SectionProps) {
  const bgImageUrl = backgroundImage ? urlForImage(backgroundImage).width(1600).height(900).url() : null
  const hasContactInfo = email || phone || address

  return (
    <section
      id={id}
      className="contact-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Optional overlay if background image is present */}
      {bgImageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {title && (
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', color: 'var(--color-text-primary)' }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            {description}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: hasContactInfo ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
            gap: '40px',
            maxWidth: hasContactInfo ? '1200px' : '600px',
            margin: '0 auto',
          }}
        >
          {/* Contact Information - Only show if we have contact details */}
          {hasContactInfo && (
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--color-text-primary)' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {email && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>Email</strong>
                    <a 
                      href={`mailto:${email}`} 
                      style={{ 
                        color: 'var(--color-primary)', 
                        textDecoration: 'none',
                        fontSize: '1rem',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {email}
                    </a>
                  </div>
                )}
                {phone && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>Phone</strong>
                    <a 
                      href={`tel:${phone}`} 
                      style={{ 
                        color: 'var(--color-primary)', 
                        textDecoration: 'none',
                        fontSize: '1rem',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {address && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>Address</strong>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.6', fontSize: '1rem' }}>
                      {address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div>
            {formTitle && <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--color-text-primary)' }}>{formTitle}</h3>}
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                style={{
                  padding: '12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                style={{
                  padding: '12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                style={{
                  padding: '12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 30px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}



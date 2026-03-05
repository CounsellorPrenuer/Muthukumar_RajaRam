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
          <h2 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '700' }}>
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
            <div
              style={{
                backgroundColor: 'var(--color-background)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.75rem', marginBottom: '30px', color: 'var(--color-text-primary)', fontWeight: '600' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {email && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</strong>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        transition: 'opacity 0.2s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {email}
                    </a>
                  </div>
                )}
                {phone && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</strong>
                    <a
                      href={`tel:${phone}`}
                      style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        transition: 'opacity 0.2s',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {address && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Address</strong>
                    <p style={{ color: 'var(--color-text-primary)', margin: 0, lineHeight: '1.6', fontSize: '1.1rem' }}>
                      {address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div
            style={{
              backgroundColor: 'var(--color-background)',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            {formTitle && <h3 style={{ fontSize: '1.75rem', marginBottom: '30px', color: 'var(--color-text-primary)', fontWeight: '600' }}>{formTitle}</h3>}
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                style={{
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                style={{
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                style={{
                  padding: '16px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  outline: 'none',
                  minHeight: '120px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginTop: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.opacity = '1'
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



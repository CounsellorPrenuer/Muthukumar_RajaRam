'use client'

import { SectionProps } from '@/lib/sections/registry'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

export function HeroSection({ heading, subheading, cta, backgroundImage, globalHeroImage }: SectionProps & { globalHeroImage?: any }) {
  const displayImage = backgroundImage || globalHeroImage

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundColor: '#fcfdfe',
        minHeight: '80vh',
        padding: '100px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: displayImage ? '1fr 1fr' : '1fr',
          gap: displayImage ? '60px' : '0',
          alignItems: 'center',
          textAlign: displayImage ? 'left' : 'center',
        }}
        className="hero-container"
      >
        <div style={{ textAlign: displayImage ? 'left' : 'center' }}>
          <h1 style={{
            fontSize: '4.5rem',
            marginBottom: '24px',
            lineHeight: '1.05',
            fontWeight: '700',
            textAlign: displayImage ? 'left' : 'center',
            color: 'var(--color-primary)' // Cold Sky Blue
          }}>
            {heading}
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '42px',
            color: 'var(--color-text-secondary)', // Medium Cool Gray
            maxWidth: displayImage ? '560px' : '800px',
            marginLeft: displayImage ? '0' : 'auto',
            marginRight: displayImage ? '0' : 'auto',
            textAlign: displayImage ? 'left' : 'center',
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            {subheading}
          </p>
          <a
            href={cta?.link || '#programs'}
            style={{
              display: displayImage ? 'inline-block' : 'table',
              margin: displayImage ? '0' : '0 auto',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              padding: '14px 40px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
          >
            {cta?.text}
          </a>
        </div>

        {displayImage && (
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
              width: '100%',
              maxWidth: '600px',
              border: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '180px'
            }}>
              {displayImage?.asset && (
                <Image
                  src={urlForImage(displayImage).url()}
                  alt={displayImage.alt || 'Hero Image'}
                  width={500}
                  height={200}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  priority
                />
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 40px !important;
          }
          .hero-container > div {
              text-align: center !important;
          }
          h1 {
              font-size: 2.5rem !important;
          }
          p {
              margin-left: auto;
              margin-right: auto;
          }
        }
      `}</style>
    </section>
  )
}



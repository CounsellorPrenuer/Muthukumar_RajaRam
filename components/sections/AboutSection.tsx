'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

export function AboutSection({ title, description, image, id }: SectionProps) {
  const imageUrl = image ? urlForImage(image).width(800).height(600).url() : null
  const altText = image?.alt || title || 'About section image'

  return (
    <section
      id={id}
      className="about-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: imageUrl ? '1fr 1fr' : '1fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {imageUrl && (
          <div
            style={{
              overflow: 'hidden',
              borderRadius: '8px',
              order: 1,
              position: 'relative',
              minHeight: '400px',
            }}
          >
            <Image
              src={imageUrl}
              alt={altText}
              width={800}
              height={600}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
        <div style={{ order: imageUrl ? 2 : 1, textAlign: imageUrl ? 'left' : 'center', maxWidth: imageUrl ? 'none' : '800px', margin: imageUrl ? '0' : '0 auto' }}>
          {title && <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-text-primary)' }}>{title}</h2>}
          {description && (
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: 'var(--color-text-secondary)',
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}


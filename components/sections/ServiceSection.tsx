'use client'

import { SectionProps } from '@/lib/sections/registry'
import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

export function ServiceSection({ title, description, services, id }: SectionProps) {
  return (
    <section
      id={id}
      className="service-section"
      style={{
        padding: '80px 20px',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {title && (
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>
            {title}
          </h2>
        )}
        {description && (
          <p style={{ fontSize: '1.1rem', marginBottom: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            {description}
          </p>
        )}

        {services && services.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {services.map((service: any, idx: number) => {
              const iconUrl = service.icon ? urlForImage(service.icon).width(400).height(300).url() : null
              const iconAlt = service.icon?.alt || service.serviceName || 'Service icon'

              return (
                <div
                  key={idx}
                  style={{
                    padding: '30px',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {iconUrl && (
                    <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image
                        src={iconUrl}
                        alt={iconAlt}
                        width={400}
                        height={300}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                  {service.serviceName && (
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--color-text-primary)' }}>
                      {service.serviceName}
                    </h3>
                  )}
                  {service.serviceDescription && (
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                      {service.serviceDescription}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}


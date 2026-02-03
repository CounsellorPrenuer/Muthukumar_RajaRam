/**
 * SERVICES SECTION
 * Lists services offered
 */

interface Service {
  title?: string
  description?: string
  icon?: string
}

interface ServicesSectionProps {
  heading?: string
  services?: Service[]
}

export default function ServicesSection({
  heading,
  services,
}: ServicesSectionProps) {
  return (
    <section
      style={{
        padding: '80px 20px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {heading && (
          <h2
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '60px',
              color: '#333',
            }}
          >
            {heading}
          </h2>
        )}

        {services && services.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
            }}
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                }}
              >
                {service.icon && (
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
                    {service.icon}
                  </div>
                )}
                {service.title && (
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      marginBottom: '10px',
                      color: '#333',
                    }}
                  >
                    {service.title}
                  </h3>
                )}
                {service.description && (
                  <p style={{ color: '#666', fontSize: '0.95rem' }}>
                    {service.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

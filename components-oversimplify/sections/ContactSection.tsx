/**
 * CONTACT SECTION
 * Contact information and details
 */

interface ContactSectionProps {
  heading?: string
  description?: string
  email?: string
  phone?: string
  address?: string
}

export default function ContactSection({
  heading,
  description,
  email,
  phone,
  address,
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      style={{
        padding: '80px 20px',
        backgroundColor: 'white',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        {heading && (
          <h2
            style={{
              fontSize: '2.5rem',
              marginBottom: '20px',
              color: '#333',
            }}
          >
            {heading}
          </h2>
        )}

        {description && (
          <p
            style={{
              fontSize: '1.1rem',
              marginBottom: '40px',
              color: '#666',
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {email && (
            <div>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${email}`} style={{ color: '#667eea' }}>
                {email}
              </a>
            </div>
          )}

          {phone && (
            <div>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${phone}`} style={{ color: '#667eea' }}>
                {phone}
              </a>
            </div>
          )}

          {address && (
            <div>
              <strong>Address:</strong>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>{address}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * MENTORIA STRENGTHS SECTION
 * Highlights Mentoria's key offerings
 */

interface Strength {
  title?: string
  description?: string
  icon?: string
}

interface MentoriaStrengthsSectionProps {
  heading?: string
  subheading?: string
  strengths?: Strength[]
}

export default function MentoriaStrengthsSection({
  heading,
  subheading,
  strengths,
}: MentoriaStrengthsSectionProps) {
  return (
    <section
      style={{
        padding: '80px 20px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Heading */}
        {heading && (
          <h2
            style={{
              fontSize: '2.5rem',
              textAlign: 'center',
              marginBottom: '15px',
              color: '#333',
            }}
          >
            {heading}
          </h2>
        )}

        {/* Subheading */}
        {subheading && (
          <p
            style={{
              fontSize: '1.1rem',
              textAlign: 'center',
              marginBottom: '60px',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 60px',
            }}
          >
            {subheading}
          </p>
        )}

        {/* Strengths Grid */}
        {strengths && strengths.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {strengths.map((strength, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  padding: '40px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                }}
              >
                {strength.icon && (
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    {strength.icon}
                  </div>
                )}
                {strength.title && (
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      marginBottom: '15px',
                      color: '#333',
                    }}
                  >
                    {strength.title}
                  </h3>
                )}
                {strength.description && (
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    {strength.description}
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

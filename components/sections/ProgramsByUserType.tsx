'use client'

import { SectionProps } from '@/lib/sections/registry'

export function ProgramsByUserType({ title, programs }: SectionProps & { programs?: Array<{ title: string, description: string, cta: string, link: string }> }) {

    // Fallback if no programs are provided from Sanity yet
    const displayPrograms = programs?.length && programs.length > 0 ? programs : [
        {
            title: 'School Students (8-9)',
            description: 'Choose the right stream and subjects for your future.',
            cta: 'Explore Options',
            link: '#',
        },
        {
            title: 'School Students (10-12)',
            description: 'Discover courses and exams to prepare for your dream career.',
            cta: 'Get Guidance',
            link: '#',
        },
        {
            title: 'College Students (1st and 2nd year)',
            description: 'Select electives, internships, and career paths early.',
            cta: 'Plan Your Path',
            link: '#',
        },
        {
            title: 'College Students (above 2 years)',
            description: 'Prepare for jobs, higher studies, and career transitions.',
            cta: 'Advance Your Career',
            link: '#',
        },
        {
            title: 'Working Professionals (1-5 years)',
            description: 'Make practical career switches and upskill for growth.',
            cta: 'Upskill & Switch',
            link: '#',
        },
        {
            title: 'Working Professionals (above 5 years)',
            description: 'Strategize for leadership, entrepreneurship, or new directions.',
            cta: 'Lead & Innovate',
            link: '#',
        },
    ];

    return (
        <section
            id="programs"
            style={{
                padding: '100px 20px',
                backgroundColor: '#f8fafc',
                textAlign: 'center',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2
                    style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'var(--color-text-primary)',
                        marginBottom: '60px',
                    }}
                >
                    {title || 'Programs by User Type'}
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '30px',
                    }}
                >
                    {displayPrograms.map((program, idx) => (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                padding: '40px',
                                borderRadius: '16px',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '280px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'default',
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)'
                                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        color: 'var(--color-primary)',
                                        marginBottom: '15px',
                                        lineHeight: '1.3',
                                    }}
                                >
                                    {program.title}
                                </h3>
                                <p
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '1.1rem',
                                        marginBottom: '30px',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    {program.description}
                                </p>
                            </div>
                            <a
                                href={program.link}
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '100px',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    alignSelf: 'flex-start',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
                                onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
                            >
                                {program.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

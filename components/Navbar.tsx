'use client'

import { urlForImage } from '@/lib/sanity'
import Image from 'next/image'

interface NavLink {
  label: string
  href: string
}

interface NavbarProps {
  logo?: string
  logoImage?: any
  links?: NavLink[]
}

export function Navbar({ logo, logoImage, links }: NavbarProps) {
  const logoImageUrl = logoImage ? urlForImage(logoImage).width(200).height(60).url() : null
  const logoAlt = logoImage?.alt || logo || 'Logo'

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--color-background)',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--color-text-primary)',
          }}
        >
          {logoImageUrl ? (
            <Image
              src={logoImageUrl}
              alt={logoAlt}
              width={200}
              height={60}
              style={{
                height: 'auto',
                maxHeight: '40px',
                width: 'auto',
                maxWidth: '200px',
              }}
              priority
            />
          ) : (
            logo || 'Logo'
          )}
        </div>

        {/* Navigation Links */}
        {links && links.length > 0 && (
          <ul
            style={{
              display: 'flex',
              gap: '30px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  style={{
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

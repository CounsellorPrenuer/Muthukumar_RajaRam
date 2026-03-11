import type { Metadata } from 'next'
import React from 'react'

import './globals.css'
import { Navbar } from '@/components/Navbar'
import { getNavbar, getSiteConfig } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Santosh - Scientific Career Clarity',
  description: 'Career Assessment based on Interest, Personality and Ability for Students & Professionals',
}

// Static export configuration
export const dynamic = 'force-static'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navbar = null
  let siteConfig = null

  try {
    navbar = await getNavbar()
  } catch (error) {
    console.log('[Layout] Navbar fetch failed, using defaults')
  }
  try {
    siteConfig = await getSiteConfig()
  } catch (error) {
    console.log('[Layout] SiteConfig fetch failed, using defaults')
  }

  // Define CSS variables from Sanity with sensible defaults
  const cssVars = {
    '--color-primary': siteConfig?.primaryColor || '#0284c7', // Cold Sky Blue
    '--color-primary-hover': siteConfig?.primaryHoverColor || '#0369a1', // Darker Cold Blue
    '--color-primary-dark': '#0c4a6e', // Navy for hover states
    '--color-background': siteConfig?.backgroundColor || '#f8fafc', // Ice White
    '--color-background-secondary': '#f1f5f9', // Very Light Cool Gray
    '--color-surface': siteConfig?.surfaceColor || '#ffffff', // Clean White Cards
    '--color-text-primary': siteConfig?.textPrimary || '#0f172a', // Slate 900
    '--color-text-secondary': siteConfig?.textSecondary || '#475569', // Slate 600
    '--color-text-on-dark': '#ffffff', // White text for dark backgrounds
    '--color-border': siteConfig?.borderColor || '#cbd5e1', // Light Steel Border
    '--color-footer-background': siteConfig?.footerBackground || '#0f172a', // Deep Slate
    '--color-footer-text': siteConfig?.footerText || '#ffffff', // White
  } as React.CSSProperties

  const allPages = await import('@/lib/sanity').then(m => m.getAllPages())
  const pages = allPages?.filter((p: any) => p.slug?.toLowerCase() !== 'home') || []

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          ...cssVars
        }}
      >
        <Navbar
          logo={siteConfig?.logo}
          logoImage={siteConfig?.logoImage}
          links={navbar?.links}
          pages={pages}
        />
        {children}
      </body>
    </html>
  )
}

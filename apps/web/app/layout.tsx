import './globals.css'

import type {Metadata} from 'next'

import {generateOGImageURL, OG_CONFIGS} from '../lib/og/utils'
import {SanityLive} from '../lib/sanity/live'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://36warren.com'),
  title: '36 Warren Street Storm Drain Investigation | Municipal Infrastructure Failure',
  description:
    'Comprehensive timeline documenting storm drain infrastructure failure at 36 Warren Street NE, Atlanta, flooding incidents, and negligent city response.',
  keywords: [
    '36 warren street ne',
    '36 warren st atlanta',
    'storm drain failure atlanta',
    'infrastructure failure',
    'municipal negligence',
    'flooding atlanta',
    'property damage',
    'warren street flooding',
    'city of atlanta watershed management',
    'atlanta storm water problems',
  ].join(', '),
  authors: [{name: 'Property Owner', url: 'https://36warren.com'}],
  creator: 'Property Owner Documentation Project',
  publisher: '36 Warren Street Investigation',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  category: 'Investigation',
  classification: 'Public Documentation',

  // Canonical URL
  alternates: {
    canonical: 'https://36warren.com',
  },

  // Enhanced OpenGraph
  openGraph: {
    title: '36 Warren Street Storm Drain Investigation',
    description: 'Documentation of municipal storm drain failure at 36 Warren Street NE, Atlanta',
    type: 'website',
    locale: 'en_US',
    url: 'https://36warren.com',
    siteName: '36 Warren Street Investigation',
    images: [
      {
        url: generateOGImageURL(OG_CONFIGS.home),
        width: 1200,
        height: 630,
        alt: '36 Warren Street Storm Drain Investigation Documentation',
      },
    ],
  },

  // Enhanced Twitter
  twitter: {
    card: 'summary_large_image',
    title: '36 Warren Street Storm Drain Investigation',
    description: 'Documentation of municipal storm drain failure at 36 Warren Street NE, Atlanta',
    images: [generateOGImageURL(OG_CONFIGS.home)],
  },

  // Favicons and icons
  icons: {
    icon: [
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
    ],
    shortcut: '/favicon.ico',
    apple: [{url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}],
  },

  // Web app manifest
  manifest: '/manifest.json',

  // Geographic targeting
  other: {
    'geo.region': 'US-GA',
    'geo.placename': 'Atlanta',
    'geo.position': '33.7539;-84.326',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="investigation" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Additional meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Add Google Search Console verification when available */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
      </head>
      <body className="antialiased">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>

        <main id="main-content">{children}</main>
        <SanityLive />
      </body>
    </html>
  )
}

import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'

import {SanityLive} from '../lib/sanity/live'

export const metadata: Metadata = {
  title: 'Storm Drain Investigation | Municipal Infrastructure Failure Documentation',
  description:
    'Comprehensive timeline documenting municipal storm drain infrastructure failure, flooding incidents, and negligent city response.',
  keywords: 'storm drain, infrastructure failure, municipal negligence, flooding, property damage',
  authors: [{name: 'Property Owner'}],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <SanityLive />
        <SpeedInsights />
      </body>
    </html>
  )
}

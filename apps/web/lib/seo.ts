/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Metadata} from 'next'

interface SeoData {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

interface LocationData {
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
  relatedAreas?: string[]
}

interface EntryData {
  name: string
  shortDescription: string
  date: string
  seo?: SeoData
  location?: LocationData
}

// Generate meta keywords with location emphasis
export function generateKeywords(
  entryKeywords: string[] = [],
  includeLocation: boolean = true,
): string {
  const baseKeywords = [
    'storm drain',
    'infrastructure failure',
    'municipal negligence',
    'flooding',
    'property damage',
    'city of atlanta department of watershed management',
    'watershed management',
    'dwm',
    'atlanta',
    'city of atlanta',
  ]

  const locationKeywords = includeLocation
    ? ['36 warren street', '36 warren st', 'warren street']
    : []

  const allKeywords = [...locationKeywords, ...entryKeywords, ...baseKeywords]

  // Remove duplicates and return as comma-separated string
  return [...new Set(allKeywords)].join(', ')
}

// Generate dynamic metadata for entries
export function generateEntryMetadata(entry: EntryData): Metadata {
  const title = entry.seo?.metaTitle || `${entry.name} | 36 Warren Street Storm Drain Investigation`

  const description =
    entry.seo?.metaDescription ||
    `${entry.shortDescription} - Documented incident at 36 Warren Street on ${entry.date}`

  const keywords = generateKeywords(
    entry.seo?.keywords,
    !!entry.location?.address?.includes('36 Warren'),
  )

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: entry.date,
      tags: entry.seo?.keywords || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

// Generate location-optimized metadata
export function generateLocationMetadata(
  title: string = '36 Warren Street',
  description: string = 'Storm drain infrastructure failure location',
  address?: string,
): Metadata {
  const fullTitle = `${title} | Storm Drain Investigation`
  const fullDescription = `${description} - Comprehensive documentation of infrastructure issues at ${address || '36 Warren Street'}`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: generateKeywords([], true),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
    },
  }
}

// Extract plain text from rich text for SEO
export function extractTextFromRichText(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return ''

  return blocks
    .filter(
      (block): block is any =>
        typeof block === 'object' && block !== null && (block as any)._type === 'block',
    )
    .map((block: any) =>
      block.children
        ?.filter((child: {_type: string}) => child._type === 'span')
        .map((child: {text: string}) => child.text)
        .join(''),
    )
    .join(' ')
    .trim()
}

// Generate canonical URL
export function generateCanonicalUrl(path: string = ''): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://36warren.com'
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{name: string; item: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: generateCanonicalUrl(item.item),
    })),
  }
}

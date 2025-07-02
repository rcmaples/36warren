// JavaScript version of OG utils for sitemap config
export function generateOGImageURL({
  title,
  subtitle,
  description,
  type = 'investigation',
  location = 'Atlanta, Georgia',
}) {
  const params = new URLSearchParams()

  params.set('title', title)
  if (subtitle) params.set('subtitle', subtitle)
  if (description) params.set('description', description)
  params.set('type', type)
  params.set('location', location)

  return `/api/og?${params.toString()}`
}

// Predefined OG image configurations for different pages
export const OG_CONFIGS = {
  home: {
    title: '36 Warren Street Storm Drain Investigation',
    subtitle: 'Municipal Infrastructure Failure',
    description: 'Documentation of municipal storm drain failure and negligent city response',
    type: 'investigation',
  },
  summary: {
    title: 'Executive Summary',
    subtitle: '36 Warren Street Investigation',
    description:
      'Comprehensive overview of storm drain infrastructure failure and municipal negligence',
    type: 'summary',
  },
  location: {
    title: '36 Warren Street NE',
    subtitle: 'Location & Infrastructure',
    description: 'Detailed information about the storm drain infrastructure failure location',
    type: 'location',
  },
  timeline: {
    title: 'Timeline Documentation',
    subtitle: '36 Warren Street Case',
    description: 'Chronological documentation of storm drain failures and municipal communications',
    type: 'timeline',
  },
}

// Helper to get full URL for absolute links
export function getAbsoluteOGImageURL(config) {
  const relativeURL = generateOGImageURL(config)
  return `https://36warren.com${relativeURL}`
}

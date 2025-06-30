// Legacy interfaces for backward compatibility
export interface TimelineImage {
  url: string
  caption: string
}

// Sanity-based types
export interface SanityImage {
  asset?: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityPerson {
  _id: string
  name: string
  jobTitle?: string
  department?: string
  email?: string
  avatar?: SanityImage
}

export interface TimelineEntry {
  _id: string
  name: string
  date: string
  shortDescription: string
  fullDescription: string
  impact?: 'low' | 'medium' | 'high' | 'critical'
  gallery?: SanityImage[]
  people?: SanityPerson[]
}

export type ViewType = 'timeline' | 'summary'

// Executive Summary types
export interface ExecutiveSummaryData {
  title: string
  subtitle: string
  caseOverview: {
    title: string
    content: string
  }
  timelineSection: {
    title: string
    events: Array<{
      date: string
      description: string
    }>
  }
  documentedDamages: {
    title: string
    damages: string[]
  }
  financialImpact: {
    title: string
    items: Array<{
      label: string
      value: string
    }>
  }
  municipalNegligence: {
    title: string
    items: string[]
  }
  evidence: {
    title: string
    stats: Array<{
      number: string
      label: string
    }>
  }
  conclusion: {
    title: string
    content: string
  }
}

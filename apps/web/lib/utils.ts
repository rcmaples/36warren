import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

import type {TimelineEntry} from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate URL for a timeline entry
export function getEventUrl(entry: TimelineEntry): string {
  return `/event/${entry._id}`
}

// Generate a slug from entry name (for potential future slug-based routing)
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Generate shareable URL with proper domain (for social sharing)
export function getShareableEventUrl(entry: TimelineEntry, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  return `${base}/event/${entry._id}`
}

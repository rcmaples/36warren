// Utility functions for processing Sanity data
import type {TimelineEntry} from './types'

// Format date from ISO string to YYYY-MM-DD
export function formatEntryDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // Returns YYYY-MM-DD
  } catch (error) {
    console.warn('Invalid date format:', dateString)
    return dateString // Return original if parsing fails
  }
}

// Simple image conversion without importing image utilities (to avoid build errors)
function convertSanityImageToTimelineImage(sanityImage: any): any {
  if (!sanityImage?.asset?._ref) {
    return null
  }

  try {
    // Basic Sanity image URL construction
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mrsdi6mo'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '36warren'
    const assetId = sanityImage.asset._ref

    // Extract the asset ID parts
    const [, id, dimensions, format] = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/) || []

    if (id && dimensions && format) {
      const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`

      return {
        url: `${baseUrl}?w=800&h=600&fit=max&auto=format`,
        caption: sanityImage.alt || '',
      }
    }

    return null
  } catch (error) {
    console.warn('Failed to process Sanity image:', error)
    return null
  }
}

// Convert Sanity entry to TimelineEntry format for compatibility
export function processSanityEntry(sanityEntry: any): TimelineEntry {
  const processedImages =
    sanityEntry.gallery?.map(convertSanityImageToTimelineImage).filter(Boolean) || []

  // Process people data
  const processedPeople = sanityEntry.people || []

  return {
    _id: sanityEntry._id,
    name: sanityEntry.name,
    date: formatEntryDate(sanityEntry.date),
    shortDescription: sanityEntry.shortDescription,
    fullDescription: sanityEntry.fullDescription,
    impact: sanityEntry.impact,
    gallery: sanityEntry.gallery,
    people: processedPeople,
    // For backward compatibility with existing components that expect 'images'
    images: processedImages,
    // Map fields for backward compatibility
    title: sanityEntry.name,
    description: sanityEntry.shortDescription,
    severity: sanityEntry.impact === 'low' ? 'medium' : sanityEntry.impact || 'medium',
  } as any
}

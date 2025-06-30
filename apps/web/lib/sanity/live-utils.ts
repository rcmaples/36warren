import { revalidateTag } from 'next/cache'

/**
 * Utility functions for working with Sanity Live Content API
 */

/**
 * Revalidate Sanity content cache
 * Call this from API routes or server actions when you want to force a refresh
 */
export function revalidateSanityContent() {
  try {
    revalidateTag('sanity')
    console.log('Revalidated Sanity content cache')
  } catch (error) {
    console.error('Failed to revalidate Sanity cache:', error)
  }
}

/**
 * Check if Live Content API is properly configured
 */
export function checkLiveContentConfig() {
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
  const hasValidApiVersion = apiVersion >= 'v2021-03-25' || apiVersion >= '2021-03-25'
  
  return {
    hasValidApiVersion,
    apiVersion,
    hasToken: !!process.env.SANITY_API_READ_TOKEN,
    hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
  }
}

/**
 * Get Live Content API status for debugging
 */
export function getLiveContentStatus() {
  const config = checkLiveContentConfig()
  
  return {
    ...config,
    isFullyConfigured: config.hasValidApiVersion && config.hasProjectId && config.hasDataset,
    canUseDraftMode: config.hasToken,
  }
}

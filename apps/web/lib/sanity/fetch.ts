import {draftMode} from 'next/headers'
import type {ClientPerspective, QueryParams} from 'next-sanity'

import {client} from './client'
import {token} from './token'

// Enhanced fetch function that works with the Live Content API infrastructure
// When used in React Server Components, the data will be live-enabled via SanityLive component
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  perspective: _perspective,
  stega: _stega,
}: {
  query: QueryString
  params?: QueryParams | Promise<QueryParams>
  perspective?: Omit<ClientPerspective, 'raw'>
  stega?: boolean
}) {
  const perspective = _perspective || (await draftMode()).isEnabled ? 'previewDrafts' : 'published'
  const stega = _stega || perspective === 'previewDrafts' || process.env.VERCEL_ENV === 'preview'

  if (perspective === 'previewDrafts') {
    return client.fetch(query, await params, {
      stega,
      perspective: 'previewDrafts',
      token,
      useCdn: false,
      next: {revalidate: 0},
    })
  }

  // For published content, fetch with appropriate caching for Live Content API
  // The SanityLive component will handle real-time updates
  return client.fetch(query, await params, {
    stega,
    perspective: 'published',
    useCdn: true,
    // Shorter revalidate time to work better with live updates
    next: {revalidate: 30, tags: ['sanity']},
  })
}

// Legacy fetch function for backward compatibility
export async function sanityFetchLegacy<const QueryString extends string>({
  query,
  params = {},
  perspective: _perspective,
  stega: _stega,
}: {
  query: QueryString
  params?: QueryParams | Promise<QueryParams>
  perspective?: Omit<ClientPerspective, 'raw'>
  stega?: boolean
}) {
  const perspective = _perspective || (await draftMode()).isEnabled ? 'previewDrafts' : 'published'
  const stega = _stega || perspective === 'previewDrafts' || process.env.VERCEL_ENV === 'preview'
  if (perspective === 'previewDrafts') {
    return client.fetch(query, await params, {
      stega,
      perspective: 'previewDrafts',
      token,
      useCdn: false,
      next: {revalidate: 0},
    })
  }
  return client.fetch(query, await params, {
    stega,
    perspective: 'published',
    useCdn: true,
    next: {revalidate: 60},
  })
}

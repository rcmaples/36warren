import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from './api'

// Client optimized for Live Content API
export const client = createClient({
  projectId,
  dataset,
  apiVersion, // Should be 2025-01-01 (>= v2021-03-25)
  useCdn: true,
  perspective: 'published',
})

import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from './api'

// Client optimized for Live Content API
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

import {defineLive} from 'next-sanity'

import {client} from './client'

// Configure defineLive for the Live Content API
console.log('🔴 Configuring Live Content API with:', {
  projectId: client.config().projectId,
  dataset: client.config().dataset,
  apiVersion: client.config().apiVersion,
})

export const {sanityFetch, SanityLive} = defineLive({
  client,
  // Enable debug logging
  debug: process.env.NODE_ENV === 'development',
})

console.log('🔴 Live Content API configured. SanityLive component available.')

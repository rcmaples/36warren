import {defineLive} from 'next-sanity'

import {client} from './client'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

export const {sanityFetch, SanityLive} = defineLive({
  client,
  browserToken: token,
  serverToken: token,
})

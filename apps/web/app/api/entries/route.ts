import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

import {sanityFetch} from '@/lib/sanity/live'
import {getLiveContentStatus} from '@/lib/sanity/live-utils'
import {entriesQuery} from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    console.log('🔴 API Route: Fetching entries with Live Content API...')

    // Use the live-enabled sanityFetch
    const result = await sanityFetch({query: entriesQuery})
    console.log('🔴 Live sanityFetch result structure:', Object.keys(result))

    // Extract data from live result
    const entries = result.data || result
    console.log('🔴 Entries found:', entries?.length || 0)

    const liveStatus = getLiveContentStatus()
    console.log('🔴 Live Content status:', liveStatus.isFullyConfigured)

    return NextResponse.json({
      entries: entries || [],
      success: true,
      meta: {
        liveContentEnabled: liveStatus.isFullyConfigured,
        timestamp: new Date().toISOString(),
        usedLiveFetch: true,
      },
    })
  } catch (error) {
    console.error('🔴 Error fetching entries with Live API:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch entries',
        success: false,
        entries: [],
        meta: {
          liveContentEnabled: false,
          timestamp: new Date().toISOString(),
          usedLiveFetch: true,
        },
      },
      {status: 500},
    )
  }
}

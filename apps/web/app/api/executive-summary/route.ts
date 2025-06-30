import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/fetch'
import { executiveSummaryQuery } from '@/lib/sanity/queries'
import { getLiveContentStatus } from '@/lib/sanity/live-utils'

export async function GET(request: NextRequest) {
  try {
    const executiveSummary = await sanityFetch({ query: executiveSummaryQuery })
    const liveStatus = getLiveContentStatus()
    
    return NextResponse.json({
      executiveSummary: executiveSummary || null,
      success: true,
      meta: {
        liveContentEnabled: liveStatus.isFullyConfigured,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching executive summary:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch executive summary',
        success: false,
        executiveSummary: null,
        meta: {
          liveContentEnabled: false,
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    )
  }
}

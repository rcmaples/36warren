import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/fetch'
import { settingsQuery } from '@/lib/sanity/queries'
import { getLiveContentStatus } from '@/lib/sanity/live-utils'

export async function GET(request: NextRequest) {
  try {
    const settings = await sanityFetch({ query: settingsQuery })
    const liveStatus = getLiveContentStatus()
    
    return NextResponse.json({
      settings: settings || null,
      success: true,
      meta: {
        liveContentEnabled: liveStatus.isFullyConfigured,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch settings',
        success: false,
        settings: null,
        meta: {
          liveContentEnabled: false,
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/fetch'
import { settingsQuery } from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const settings = await sanityFetch({ query: settingsQuery })
    
    return NextResponse.json({
      settings: settings || null,
      success: true
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch settings',
        success: false,
        settings: null
      },
      { status: 500 }
    )
  }
}

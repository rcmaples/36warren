import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/fetch'
import { entriesQuery } from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const entries = await sanityFetch({ query: entriesQuery })
    
    return NextResponse.json({
      entries: entries || [],
      success: true
    })
  } catch (error) {
    console.error('Error fetching entries:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch entries',
        success: false,
        entries: []
      },
      { status: 500 }
    )
  }
}

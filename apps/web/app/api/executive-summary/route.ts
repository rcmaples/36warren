import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/fetch'
import { executiveSummaryQuery } from '@/lib/sanity/queries'

export async function GET(request: NextRequest) {
  try {
    const executiveSummary = await sanityFetch({ query: executiveSummaryQuery })
    
    return NextResponse.json({
      executiveSummary: executiveSummary || null,
      success: true
    })
  } catch (error) {
    console.error('Error fetching executive summary:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch executive summary',
        success: false,
        executiveSummary: null
      },
      { status: 500 }
    )
  }
}

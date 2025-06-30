import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

import {getLiveContentStatus} from '@/lib/sanity/live-utils'

export async function GET(request: NextRequest) {
  try {
    const status = getLiveContentStatus()

    return NextResponse.json({
      status,
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
      },
      recommendations: getRecommendations(status),
    })
  } catch (error) {
    console.error('Error checking Live Content status:', error)

    return NextResponse.json(
      {
        error: 'Failed to check Live Content status',
        timestamp: new Date().toISOString(),
      },
      {status: 500},
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRecommendations(status: any) {
  const recommendations = []

  if (!status.hasValidApiVersion) {
    recommendations.push('Update NEXT_PUBLIC_SANITY_API_VERSION to v2021-03-25 or later')
  }

  if (!status.hasProjectId) {
    recommendations.push('Set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
  }

  if (!status.hasDataset) {
    recommendations.push('Set NEXT_PUBLIC_SANITY_DATASET environment variable')
  }

  if (!status.hasToken) {
    recommendations.push(
      'Set SANITY_API_READ_TOKEN for draft mode and visual editing (optional for public content)',
    )
  }

  if (status.isFullyConfigured) {
    recommendations.push('✅ Live Content API is properly configured!')
    recommendations.push('Visit /live to see the full Live Content API implementation')
  }

  return recommendations
}

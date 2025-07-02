import {ImageResponse} from '@vercel/og'
import type {NextRequest} from 'next/server'
import React from 'react'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url)

    // Get parameters from URL
    const title = searchParams.get('title') || '36 Warren Street Storm Drain Investigation'
    const subtitle = searchParams.get('subtitle') || 'Municipal Infrastructure Failure'
    const description =
      searchParams.get('description') ||
      'Documentation of municipal storm drain failure and negligent city response'
    const type = searchParams.get('type') || 'investigation' // investigation, summary, location, timeline
    const location = searchParams.get('location') || 'Atlanta, Georgia'

    // Load Inter font
    const interSemiBold = await fetch(
      new URL(
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
      ),
    ).then((res) => res.arrayBuffer())

    const interBold = await fetch(
      new URL(
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      ),
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
            position: 'relative',
          },
        },
        // Grid pattern background
        React.createElement('div', {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(59, 130, 246, 0.05),
                rgba(59, 130, 246, 0.05) 1px,
                transparent 1px,
                transparent 50px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(59, 130, 246, 0.05),
                rgba(59, 130, 246, 0.05) 1px,
                transparent 1px,
                transparent 50px
              )
            `,
          },
        }),

        // Blue accent line at top
        React.createElement('div', {
          style: {
            width: '100%',
            height: '6px',
            background: 'linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af)',
          },
        }),

        // Main content
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              padding: '60px 60px 60px 60px',
              height: '100%',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
            },
          },
          // Header with icon and title
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '40px',
              },
            },
            // Investigation icon
            React.createElement(
              'div',
              {
                style: {
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                },
              },
              // House flooding icon
              React.createElement(
                'svg',
                {
                  width: '40',
                  height: '40',
                  viewBox: '0 0 24 24',
                  fill: 'white',
                },
                React.createElement('path', {
                  d: 'M12 3L2 7.5V9.5C2 9.5 2 16 12 16S22 9.5 22 9.5V7.5L12 3Z',
                }),
                React.createElement('path', {
                  d: 'M2 20H22',
                  stroke: 'white',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                }),
                React.createElement('path', {
                  d: 'M2 16.5H22',
                  stroke: 'white',
                  strokeWidth: '1.5',
                  strokeLinecap: 'round',
                  opacity: '0.7',
                }),
                React.createElement('path', {
                  d: 'M2 18.5H22',
                  stroke: 'white',
                  strokeWidth: '1.5',
                  strokeLinecap: 'round',
                  opacity: '0.5',
                }),
              ),
            ),

            React.createElement(
              'div',
              {style: {display: 'flex', flexDirection: 'column'}},
              React.createElement(
                'h1',
                {
                  style: {
                    fontSize: '72px',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    margin: 0,
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontFamily: 'Inter',
                  },
                },
                title.split(' ').slice(0, 3).join(' '),
              ),
              React.createElement(
                'p',
                {
                  style: {
                    fontSize: '32px',
                    fontWeight: 600,
                    color: '#94a3b8',
                    margin: '8px 0 0 0',
                    lineHeight: 1.2,
                    fontFamily: 'Inter',
                  },
                },
                subtitle,
              ),
            ),
          ),

          // Description
          React.createElement(
            'div',
            {
              style: {
                fontSize: '24px',
                color: '#cbd5e1',
                fontWeight: 400,
                lineHeight: 1.4,
                maxWidth: '800px',
                fontFamily: 'Inter',
              },
            },
            description,
          ),

          // Footer
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
              },
            },
            // Location
            React.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '20px',
                  color: '#3b82f6',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                },
              },
              React.createElement(
                'svg',
                {width: '24', height: '24', viewBox: '0 0 24 24', fill: '#3b82f6'},
                React.createElement('path', {
                  d: 'M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z',
                }),
              ),
              location,
            ),

            // Badge
            React.createElement(
              'div',
              {
                style: {
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  color: '#3b82f6',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: 'Inter',
                },
              },
              getTypeLabel(type),
            ),
          ),
        ),
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interSemiBold,
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: interBold,
            weight: 900,
            style: 'normal',
          },
        ],
      },
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'summary':
      return 'Investigation Report'
    case 'location':
      return 'Location Details'
    case 'timeline':
      return 'Chronological Evidence'
    case 'investigation':
    default:
      return 'Municipal Accountability'
  }
}

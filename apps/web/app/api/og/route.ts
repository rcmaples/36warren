import {ImageResponse} from '@vercel/og'
import type {NextRequest} from 'next/server'

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
    const type = searchParams.get('type') || 'investigation'
    const location = searchParams.get('location') || 'Atlanta, Georgia'

    // Add debug parameter to return HTML preview
    const debug = searchParams.get('debug') === 'true'

    if (debug) {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>OG Image Debug</title>
            <style>
              body { font-family: system-ui; padding: 20px; background: #f5f5f5; }
              .preview { 
                width: 600px; 
                height: 315px; 
                border: 2px solid #ddd; 
                margin: 20px 0;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%);
                color: white;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .title { font-size: 24px; font-weight: bold; }
              .subtitle { font-size: 16px; color: #94a3b8; }
              .description { font-size: 12px; color: #cbd5e1; margin: 10px 0; }
              .footer { display: flex; justify-content: space-between; align-items: center; }
              .location { color: #3b82f6; }
              .badge { 
                background: rgba(59, 130, 246, 0.1); 
                border: 1px solid rgba(59, 130, 246, 0.3);
                padding: 4px 8px; 
                border-radius: 20px; 
                font-size: 10px;
                color: #3b82f6;
              }
              code { background: #333; padding: 2px 4px; border-radius: 3px; }
            </style>
          </head>
          <body>
            <h1>OG Image Debug Preview</h1>
            <p><strong>Parameters received:</strong></p>
            <ul>
              <li>Title: ${title}</li>
              <li>Subtitle: ${subtitle}</li>
              <li>Description: ${description}</li>
              <li>Type: ${type}</li>
              <li>Location: ${location}</li>
            </ul>
            
            <div class="preview">
              <div>
                <div class="title">${title}</div>
                <div class="subtitle">${subtitle}</div>
                <div class="description">${description}</div>
              </div>
              <div class="footer">
                <div class="location">📍 ${location}</div>
                <div class="badge">${getTypeLabel(type)}</div>
              </div>
            </div>
            
            <h2>Test Links:</h2>
            <ul>
              <li><a href="?title=Test&type=investigation">Basic test (image)</a></li>
              <li><a href="?title=Test&type=investigation&debug=true">Debug view (this page)</a></li>
              <li><a href="?title=Executive%20Summary&subtitle=Case%20Report&type=summary">Summary test</a></li>
              <li><a href="?title=36%20Warren%20Street%20NE&subtitle=Location&type=location">Location test</a></li>
            </ul>
            
            <h2>Integration Test:</h2>
            <p>To test how this appears in social media, use:</p>
            <ul>
              <li><strong>Facebook Debugger:</strong> <a href="https://developers.facebook.com/tools/debug/" target="_blank">https://developers.facebook.com/tools/debug/</a></li>
              <li><strong>Twitter Card Validator:</strong> <a href="https://cards-dev.twitter.com/validator" target="_blank">https://cards-dev.twitter.com/validator</a></li>
              <li><strong>LinkedIn Inspector:</strong> <a href="https://www.linkedin.com/post-inspector/" target="_blank">https://www.linkedin.com/post-inspector/</a></li>
            </ul>
            
            <h2>Meta Tag Example:</h2>
            <code>&lt;meta property="og:image" content="${request.url.split('?')[0]}?title=36%20Warren%20Street&type=investigation" /&gt;</code>
          </body>
        </html>
      `,
        {
          headers: {'Content-Type': 'text/html'},
        },
      )
    }

    // Get the base URL for fetching the favicon
    const baseUrl = new URL(request.url).origin

    // Fetch the favicon (try different sizes)
    let faviconData
    try {
      // Try to fetch the 192px version first (good quality for OG image)
      const faviconResponse = await fetch(`${baseUrl}/android-chrome-192x192.png`)
      if (faviconResponse.ok) {
        faviconData = await faviconResponse.arrayBuffer()
      } else {
        // Fallback to 32px version
        const fallbackResponse = await fetch(`${baseUrl}/favicon-32x32.png`)
        if (fallbackResponse.ok) {
          faviconData = await fallbackResponse.arrayBuffer()
        }
      }
    } catch (error) {
      console.log('Could not fetch favicon, using fallback icon')
    }

    // Convert favicon to base64 if we got it
    let faviconBase64 = ''
    if (faviconData) {
      const faviconBytes = new Uint8Array(faviconData)
      const base64String = btoa(String.fromCharCode(...faviconBytes))
      faviconBase64 = `data:image/png;base64,${base64String}`
    }

    const element = {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
          position: 'relative',
        },
        children: [
          // Grid pattern background
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.05) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.05) 1px, transparent 1px, transparent 50px)',
              },
            },
          },
          // Blue accent line at top
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                height: '6px',
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8, #1e40af)',
              },
            },
          },
          // Main content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                padding: '60px 60px 60px 60px',
                height: '100%',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1,
              },
              children: [
                // Header with icon and title
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      marginBottom: '40px',
                    },
                    children: [
                      // Investigation icon container
                      {
                        type: 'div',
                        props: {
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
                          children: faviconBase64
                            ? [
                                // Use actual favicon if available
                                {
                                  type: 'img',
                                  props: {
                                    src: faviconBase64,
                                    style: {
                                      width: '48px',
                                      height: '48px',
                                    },
                                  },
                                },
                              ]
                            : [
                                // Fallback icon
                                {
                                  type: 'div',
                                  props: {
                                    style: {
                                      width: '40px',
                                      height: '40px',
                                      background: 'white',
                                      borderRadius: '8px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '20px',
                                    },
                                    children: '🏠',
                                  },
                                },
                              ],
                        },
                      },
                      // Title and subtitle
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          children: [
                            {
                              type: 'h1',
                              props: {
                                style: {
                                  fontSize: title.length > 30 ? '56px' : '72px',
                                  fontWeight: 900,
                                  lineHeight: 0.9,
                                  margin: 0,
                                  color: 'white',
                                  fontFamily: 'system-ui',
                                },
                                children:
                                  title.length > 50 ? title.substring(0, 47) + '...' : title,
                              },
                            },
                            {
                              type: 'p',
                              props: {
                                style: {
                                  fontSize: '32px',
                                  fontWeight: 600,
                                  color: '#94a3b8',
                                  margin: '8px 0 0 0',
                                  lineHeight: 1.2,
                                  fontFamily: 'system-ui',
                                },
                                children: subtitle,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                // Description
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#cbd5e1',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      maxWidth: '800px',
                      fontFamily: 'system-ui',
                    },
                    children:
                      description.length > 120
                        ? description.substring(0, 117) + '...'
                        : description,
                  },
                },
                // Footer
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto',
                    },
                    children: [
                      // Location
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '20px',
                            color: '#3b82f6',
                            fontWeight: 600,
                            fontFamily: 'system-ui',
                          },
                          children: `📍 ${location}`,
                        },
                      },
                      // Badge
                      {
                        type: 'div',
                        props: {
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
                            fontFamily: 'system-ui',
                          },
                          children: getTypeLabel(type),
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    })
  } catch (e: any) {
    console.log(`OG Image generation error: ${e.message}`)
    return new Response(`Failed to generate the image: ${e.message}`, {
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

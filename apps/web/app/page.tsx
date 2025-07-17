import {Suspense} from 'react'

import {sanityFetch} from '../lib/sanity/live'
import {ENTRIES_QUERY, SETTINGS_QUERY} from '../lib/sanity/queries'
import ErrorBoundary from './components/ErrorBoundary'
import Timeline from './components/Timeline'

interface TimelineProps {
  initialEntries: unknown[]
  initialSettings: unknown
  initialExecutiveSummary: unknown
}

function TimelineWithSuspense(props: TimelineProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen relative overflow-hidden">
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black" />
          <div className="relative flex items-center justify-center min-h-screen">
            <div className="text-white text-xl font-semibold">Loading Timeline...</div>
          </div>
        </div>
      }
    >
      <Timeline {...props} />
    </Suspense>
  )
}

export default async function Page() {
  try {
    // Fetch timeline entries and settings using live-enabled sanityFetch
    const [entriesResult, settingsResult] = await Promise.all([
      sanityFetch({query: ENTRIES_QUERY}),
      sanityFetch({query: SETTINGS_QUERY}),
    ])

    const entries = entriesResult.data || entriesResult
    const settings = settingsResult.data || settingsResult

    console.log('env:', process.env)

    return (
      <ErrorBoundary>
        <div style={{marginTop: '48px'}}>
          <TimelineWithSuspense
            initialEntries={entries || []}
            initialSettings={settings}
            initialExecutiveSummary={null}
          />
        </div>
      </ErrorBoundary>
    )
  } catch {
    // Fallback with empty data
    return (
      <ErrorBoundary>
        <div style={{marginTop: '48px'}}>
          <TimelineWithSuspense
            initialEntries={[]}
            initialSettings={null}
            initialExecutiveSummary={null}
          />
        </div>
      </ErrorBoundary>
    )
  }
}

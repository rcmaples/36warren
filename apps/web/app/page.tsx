import {sanityFetch} from '../lib/sanity/live'
import {ENTRIES_QUERY, SETTINGS_QUERY} from '../lib/sanity/queries'
import ErrorBoundary from './components/ErrorBoundary'
import Timeline from './components/Timeline'

export default async function Page() {
  try {
    // Fetch timeline entries and settings using live-enabled sanityFetch
    const [entriesResult, settingsResult] = await Promise.all([
      sanityFetch({query: ENTRIES_QUERY}),
      sanityFetch({query: SETTINGS_QUERY}),
    ])

    const entries = entriesResult.data || entriesResult
    const settings = settingsResult.data || settingsResult

    return (
      <ErrorBoundary>
        <div style={{marginTop: '48px'}}>
          <Timeline
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
          <Timeline initialEntries={[]} initialSettings={null} initialExecutiveSummary={null} />
        </div>
      </ErrorBoundary>
    )
  }
}

import {sanityFetch} from '../lib/sanity/live'
import {ENTRIES_QUERY, EXEC_SUMMARY_QUERY, SETTINGS_QUERY} from '../lib/sanity/queries'
import ErrorBoundary from './components/ErrorBoundary'
import Timeline from './components/Timeline'

export default async function Page() {
  try {
    // Fetch timeline entries, settings, and executive summary using live-enabled sanityFetch
    const [entriesResult, settingsResult, execSummaryResult] = await Promise.all([
      sanityFetch({query: ENTRIES_QUERY}),
      sanityFetch({query: SETTINGS_QUERY}),
      sanityFetch({query: EXEC_SUMMARY_QUERY}),
    ])

    const entries = entriesResult.data || entriesResult
    const settings = settingsResult.data || settingsResult
    const execSummary = execSummaryResult.data || execSummaryResult

    return (
      <ErrorBoundary>
        <div style={{marginTop: '48px'}}>
          <Timeline
            initialEntries={entries || []}
            initialSettings={settings}
            initialExecutiveSummary={execSummary}
          />
        </div>
      </ErrorBoundary>
    )
  } catch (error) {
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

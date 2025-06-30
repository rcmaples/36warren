import {sanityFetch} from '../../lib/sanity/live'
import {ENTRIES_QUERY} from '../../lib/sanity/queries'

// Simple test page to verify Live Content API
export default async function TestLivePage() {
  try {
    const result = await sanityFetch({query: ENTRIES_QUERY})

    const entries = result.data || result

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Live Content API Test</h1>

        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Live Content API Active!</strong>
          <p>This page uses Server Components with live-enabled sanityFetch.</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Entries Found: {entries?.length || 0}</h2>
        </div>

        {entries && entries.length > 0 ? (
          <div className="space-y-4">
            {entries.slice(0, 3).map((entry: any, index: number) => (
              <div key={entry._id || index} className="border p-4 rounded">
                <h3 className="font-semibold">{entry.name || 'Untitled'}</h3>
                <p className="text-sm text-gray-600">{entry.date}</p>
                <p className="text-sm">{entry.shortDescription}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No entries found or still loading...</p>
        )}

        <div className="mt-8 text-xs text-gray-500">
          <p>Try editing content in Sanity Studio - changes should appear here in real-time!</p>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Live Content API Test - Error</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    )
  }
}

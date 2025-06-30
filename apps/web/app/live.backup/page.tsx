import ErrorBoundary from '../components/ErrorBoundary'
import Timeline from '../components/Timeline/TimelineServer'
import {SanityLive} from '../lib/sanity/live'

// Server Component that fetches data directly with Live Content API
export default function LivePage() {
  return (
    <ErrorBoundary>
      <Timeline />
      {/* SanityLive component enables real-time updates */}
      <SanityLive />
    </ErrorBoundary>
  )
}

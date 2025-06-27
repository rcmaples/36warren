"use client"

import Timeline from "./components/Timeline"
import ErrorBoundary from "./components/ErrorBoundary"

export default function Page() {
  return (
    <ErrorBoundary>
      <Timeline />
    </ErrorBoundary>
  )
}

"use client"

import { useState, useEffect } from "react"
import Timeline from "./components/Timeline"
import ErrorBoundary from "./components/ErrorBoundary"

export default function Page() {
  const [liveStatus, setLiveStatus] = useState<any>(null)

  useEffect(() => {
    // Check Live Content API status
    fetch('/api/live-status')
      .then(res => res.json())
      .then(data => setLiveStatus(data))
      .catch(err => console.error('Failed to check live status:', err))
  }, [])

  return (
    <ErrorBoundary>
      {/* Live Content API Status Banner */}
      <div className="fixed top-0 left-0 right-0 bg-green-600 text-white px-4 py-2 text-xs z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>🔴 Live Content API Status: {liveStatus?.status?.isFullyConfigured ? 'Active' : 'Checking...'}</span>
            {liveStatus && (
              <span className="text-green-200">
                API v{liveStatus.status?.apiVersion}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <a 
              href="/test-live" 
              className="bg-green-800 hover:bg-green-900 px-2 py-1 rounded text-xs transition-colors"
            >
              Test Live
            </a>
            <a 
              href="/api/live-status" 
              target="_blank"
              className="bg-green-800 hover:bg-green-900 px-2 py-1 rounded text-xs transition-colors"
            >
              Debug
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Content with margin for banner */}
      <div style={{ marginTop: '48px' }}>
        <Timeline />
      </div>
    </ErrorBoundary>
  )
}

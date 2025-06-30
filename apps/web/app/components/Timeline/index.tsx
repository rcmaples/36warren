'use client'

import {useCallback, useEffect, useMemo, useState} from 'react'

import {processSanityEntry} from '@/lib/data'
import type {SanityPerson, TimelineEntry, ViewType} from '@/lib/types'

import ExecutiveSummary from './ExecutiveSummary'
import styles from './Timeline.module.css'
import TimelineItem from './TimelineItem'
import TimelineModal from './TimelineModal'

interface TimelineProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialEntries: any[]
  initialSettings: any
  initialExecutiveSummary: any
}

export default function Timeline({
  initialEntries,
  initialSettings,
  initialExecutiveSummary,
}: TimelineProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>('timeline')
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([])
  const [settings, setSettings] = useState<any>(initialSettings)

  // Helper function to extract plain text from Sanity rich text
  const getDescriptionText = (description: any): string => {
    if (!description) return ''

    // If it's already a string, return it
    if (typeof description === 'string') return description

    // If it's rich text (array of blocks), extract text
    if (Array.isArray(description)) {
      return description
        .filter((block) => block._type === 'block')
        .map((block) =>
          block.children
            ?.filter((child: any) => child._type === 'span')
            .map((child: any) => child.text)
            .join(''),
        )
        .join(' ')
        .trim()
    }

    return ''
  }

  // Process initial data from server component
  useEffect(() => {
    try {
      console.log('🔴 Timeline: Processing initial data...', {
        entriesCount: initialEntries?.length || 0,
        hasSettings: !!initialSettings,
      })

      if (initialEntries && initialEntries.length > 0) {
        const processedEntries = initialEntries.map(processSanityEntry)
        setTimelineData(processedEntries)
        console.log('🔴 Timeline: Processed entries:', processedEntries.length)
      } else {
        // No fallback to mock data - just empty array
        console.warn('🔴 Timeline: No initial entries found')
        setTimelineData([])
      }
    } catch (error) {
      console.error('🔴 Timeline: Failed to process initial data:', error)
      // No fallback to mock data on error - just empty array
      setTimelineData([])
    }
  }, [initialEntries])

  // Update settings when initialSettings prop changes (for live updates)
  useEffect(() => {
    console.log('🔴 Timeline: Updating settings...', !!initialSettings)
    setSettings(initialSettings)
  }, [initialSettings])

  useEffect(() => {
    setMounted(true)
  }, [])

  const openModal = useCallback((entry: TimelineEntry) => {
    setSelectedEntry(entry)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedEntry(null)
  }, [])

  // Navigate to next timeline entry
  const navigateToNext = useCallback(() => {
    if (!selectedEntry || timelineData.length === 0) return
    
    const currentIndex = timelineData.findIndex(entry => entry._id === selectedEntry._id)
    if (currentIndex !== -1 && currentIndex < timelineData.length - 1) {
      const nextEntry = timelineData[currentIndex + 1]
      setSelectedEntry(nextEntry)
    }
  }, [selectedEntry, timelineData])

  // Navigate to previous timeline entry
  const navigateToPrevious = useCallback(() => {
    if (!selectedEntry || timelineData.length === 0) return
    
    const currentIndex = timelineData.findIndex(entry => entry._id === selectedEntry._id)
    if (currentIndex > 0) {
      const previousEntry = timelineData[currentIndex - 1]
      setSelectedEntry(previousEntry)
    }
  }, [selectedEntry, timelineData])

  const switchView = useCallback((view: ViewType) => {
    setCurrentView(view)
  }, [])

  const memoizedTimelineItems = useMemo(() => {
    return timelineData.map((item, index) => (
      <TimelineItem
        key={item._id || `${item.date}-${index}`}
        item={item}
        index={index}
        onOpenModal={openModal}
      />
    ))
  }, [timelineData, openModal])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className={`${styles['investigation-bg']} fixed inset-0 -z-10`} />

      {/* Header with integrated tabs */}
      <header className={`${styles.banner} fixed top-0 left-0 right-0 z-40 px-4 py-6`}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={styles['banner-title']}>
            {settings?.title || 'STORM DRAIN INVESTIGATION'}
          </h1>
          <p className={styles['banner-subtitle']}>
            {getDescriptionText(settings?.description) || 'Municipal Negligence Documentation'}
          </p>

          <nav className={styles['folder-tabs']} role="tablist" aria-label="View selection">
            <button
              className={`${styles['folder-tab']} ${
                currentView === 'timeline' ? styles.active : ''
              }`}
              onClick={() => switchView('timeline')}
              role="tab"
              aria-selected={currentView === 'timeline'}
              aria-controls="timeline-content"
            >
              Timeline
            </button>
            <button
              className={`${styles['folder-tab']} ${
                currentView === 'summary' ? styles.active : ''
              }`}
              onClick={() => switchView('summary')}
              role="tab"
              aria-selected={currentView === 'summary'}
              aria-controls="summary-content"
            >
              Executive Summary
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      {currentView === 'timeline' && (
        <main
          id="timeline-content"
          role="tabpanel"
          aria-labelledby="timeline-tab"
          className="relative max-w-6xl mx-auto px-4 pb-20"
          style={{paddingTop: '200px'}}
        >
          {/* Central Timeline Line */}
          <div
            className={`${styles['timeline-line']} absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 z-0`}
          />

          {/* Timeline Items */}
          <div className="relative z-10">
            {timelineData.length > 0 ? (
              memoizedTimelineItems
            ) : (
              <div className="text-center py-20">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mx-auto max-w-md">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    No Timeline Data Available
                  </h3>
                  <p className="text-gray-300">
                    No timeline entries have been found. Please check your Sanity Studio content or
                    contact your administrator.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {currentView === 'summary' && (
        <main
          id="summary-content"
          role="tabpanel"
          aria-labelledby="summary-tab"
          className="relative"
          style={{paddingTop: '200px'}}
        >
          <ExecutiveSummary initialData={initialExecutiveSummary} />
        </main>
      )}

      {/* Modal */}
      <TimelineModal
        selectedEntry={selectedEntry}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNavigateNext={navigateToNext}
        onNavigatePrevious={navigateToPrevious}
      />
    </div>
  )
}

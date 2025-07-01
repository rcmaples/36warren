'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {useCallback, useEffect, useMemo, useState} from 'react'

import {processSanityEntry} from '@/lib/data'
import type {TimelineEntry} from '@/lib/types'

import styles from './Timeline.module.css'
import TimelineItem from './TimelineItem'
import TimelineModal from './TimelineModal'

interface TimelineProps {
  initialEntries: unknown[]
  initialSettings: unknown
  initialExecutiveSummary: unknown
}

export default function Timeline({initialEntries, initialSettings}: TimelineProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([])
  const [settings, setSettings] = useState<unknown>(initialSettings)
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Helper function to extract plain text from Sanity rich text
  const getDescriptionText = (description: unknown): string => {
    if (!description) return ''

    // If it's already a string, return it
    if (typeof description === 'string') return description

    // If it's rich text (array of blocks), extract text
    if (Array.isArray(description)) {
      return description
        .filter((block) => block._type === 'block')
        .map((block) =>
          block.children
            ?.filter((child: {_type: string}) => child._type === 'span')
            .map((child: {text: string}) => child.text)
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
      if (initialEntries && initialEntries.length > 0) {
        const processedEntries = initialEntries
          .filter((entry): entry is Record<string, unknown> => {
            return typeof entry === 'object' && entry !== null
          })
          .map(processSanityEntry)
        setTimelineData(processedEntries)
      } else {
        setTimelineData([])
      }
    } catch (error) {
      console.error('🔴 Timeline: Error processing initial data:', error)
      setTimelineData([])
    }
  }, [initialEntries])

  // Handle URL-based modal state
  useEffect(() => {
    const eventId = searchParams.get('event')
    if (eventId && timelineData.length > 0) {
      const entry = timelineData.find((item) => item._id === eventId)
      if (entry) {
        setSelectedEntry(entry)
        setIsModalOpen(true)
      } else {
        // Event ID not found, remove from URL
        router.replace('/')
      }
    } else {
      setSelectedEntry(null)
      setIsModalOpen(false)
    }
  }, [searchParams, timelineData, router])

  // Update settings when initialSettings prop changes (for live updates)
  useEffect(() => {
    setSettings(initialSettings)
  }, [initialSettings])

  useEffect(() => {
    setMounted(true)
  }, [])

  const openModal = useCallback(
    (entry: TimelineEntry) => {
      const url = new URL(window.location.href)
      url.searchParams.set('event', entry._id)
      router.push(url.pathname + url.search)
    },
    [router],
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedEntry(null)
    router.push('/')
  }, [router])

  // Navigate to next timeline entry
  const navigateToNext = useCallback(() => {
    if (!selectedEntry || timelineData.length === 0) return

    const currentIndex = timelineData.findIndex((entry) => entry._id === selectedEntry._id)
    if (currentIndex !== -1 && currentIndex < timelineData.length - 1) {
      const nextEntry = timelineData[currentIndex + 1]
      const url = new URL(window.location.href)
      url.searchParams.set('event', nextEntry._id)
      router.push(url.pathname + url.search)
    }
  }, [selectedEntry, timelineData, router])

  // Navigate to previous timeline entry
  const navigateToPrevious = useCallback(() => {
    if (!selectedEntry || timelineData.length === 0) return

    const currentIndex = timelineData.findIndex((entry) => entry._id === selectedEntry._id)
    if (currentIndex > 0) {
      const previousEntry = timelineData[currentIndex - 1]
      const url = new URL(window.location.href)
      url.searchParams.set('event', previousEntry._id)
      router.push(url.pathname + url.search)
    }
  }, [selectedEntry, timelineData, router])

  const handleSummaryNavigation = useCallback(() => {
    router.push('/summary')
  }, [router])

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
            {(settings as {title?: string})?.title || 'STORM DRAIN INVESTIGATION'}
          </h1>
          <p className={styles['banner-subtitle']}>
            {getDescriptionText((settings as {description?: unknown})?.description) ||
              'Municipal Negligence Documentation'}
          </p>

          <nav className={styles['folder-tabs']} role="tablist" aria-label="View selection">
            <button
              className={`${styles['folder-tab']} ${styles.active}`}
              role="tab"
              aria-selected={true}
              aria-controls="timeline-content"
            >
              Timeline
            </button>
            <button
              className={`${styles['folder-tab']}`}
              onClick={handleSummaryNavigation}
              role="tab"
              aria-selected={false}
              aria-controls="summary-content"
            >
              Executive Summary
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area - Timeline */}
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

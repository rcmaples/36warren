import {useCallback, useEffect} from 'react'
import {CloseIcon} from '@sanity/icons'

import type {TimelineEntry, TimelineImage} from '@/lib/types'

import PortableText from '../PortableText'
import ImageCarousel from './ImageCarousel'
import styles from './Timeline.module.css'

// Type guard for TimelineImage
function isTimelineImage(image: unknown): image is TimelineImage {
  if (!image || typeof image !== 'object') return false
  const img = image as Record<string, unknown>
  return (
    typeof img.url === 'string' && 
    typeof img.originalUrl === 'string' && 
    (img.caption === undefined || typeof img.caption === 'string')
  )
}

interface TimelineModalProps {
  selectedEntry: TimelineEntry | null
  isOpen: boolean
  onClose: () => void
  onNavigateNext?: () => void
  onNavigatePrevious?: () => void
}

// Constants
const ESCAPE_KEY = 'Escape'
const NAVIGATION_KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const

export default function TimelineModal({
  selectedEntry,
  isOpen,
  onClose,
  onNavigateNext,
  onNavigatePrevious,
}: TimelineModalProps) {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  // Combined keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ESCAPE_KEY) {
        onClose()
      } else if (e.key === NAVIGATION_KEYS.ARROW_UP || e.key === NAVIGATION_KEYS.PAGE_UP) {
        e.preventDefault()
        onNavigatePrevious?.()
      } else if (e.key === NAVIGATION_KEYS.ARROW_DOWN || e.key === NAVIGATION_KEYS.PAGE_DOWN) {
        e.preventDefault()
        onNavigateNext?.()
      }
    },
    [onClose, onNavigateNext, onNavigatePrevious],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !selectedEntry) return null

  // Extract and validate images
  const rawImages = (selectedEntry as TimelineEntry & {images?: unknown[]}).images || []
  const entryImages = rawImages.filter(isTimelineImage)
  const hasImages = entryImages.length > 0
  const displayTitle = (
    selectedEntry.name || (selectedEntry as TimelineEntry & {title?: string}).title
  )?.replace(/_/g, ' ')

  return (
    <div
      className={`${styles['modal-overlay']} fixed inset-0 z-[100] flex items-center justify-center p-4`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles['modal-content']} relative max-w-5xl w-full rounded-lg p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`${styles['close-button']} absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold z-10`}
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon style={{fontSize: '18px'}} />
        </button>

        <div className={styles['modal-date']}>{selectedEntry.date}</div>
        <h2 className={styles['modal-title']}>{displayTitle}</h2>

        {hasImages && <ImageCarousel images={entryImages} />}

        <div className={styles['modal-description']}>
          <PortableText value={selectedEntry.fullDescription || []} />
        </div>
      </div>
    </div>
  )
}

'use client'

import {Calendar, ChevronDown, ChevronUp} from 'lucide-react'
import {useCallback, useEffect, useMemo, useState} from 'react'

import type {TimelineEntry} from '@/lib/types'

import styles from './YearNavigation.module.css'

interface YearNavigationProps {
  timelineData: TimelineEntry[]
  onYearClick?: (year: string) => void
}

export default function YearNavigation({timelineData, onYearClick}: YearNavigationProps) {
  const [activeYear, setActiveYear] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)

  // Group entries by year and create year sections
  const yearSections = useMemo(() => {
    const yearMap = new Map<string, {count: number; firstEntryId: string}>()

    timelineData.forEach((entry) => {
      const year = new Date(entry.date).getFullYear().toString()
      if (!yearMap.has(year)) {
        yearMap.set(year, {count: 1, firstEntryId: entry._id})
      } else {
        yearMap.get(year)!.count++
      }
    })

    return Array.from(yearMap.entries())
      .map(([year, data]) => ({
        year,
        count: data.count,
        firstEntryId: data.firstEntryId,
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year))
  }, [timelineData])

  // Determine active year based on viewport
  useEffect(() => {
    const handleScroll = () => {
      const timelineItems = document.querySelectorAll('[data-year]')
      const viewportHeight = window.innerHeight
      const centerPoint = viewportHeight / 2

      let currentActiveYear = ''

      timelineItems.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2

        if (itemCenter <= centerPoint && itemCenter >= 0) {
          currentActiveYear = item.getAttribute('data-year') || ''
        }
      })

      if (currentActiveYear && currentActiveYear !== activeYear) {
        setActiveYear(currentActiveYear)
      }
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeYear])

  const scrollToYear = useCallback(
    (year: string, firstEntryId: string) => {
      const targetElement = document.querySelector(`[data-timeline-id="${firstEntryId}"]`)

      if (targetElement) {
        // Calculate offset to account for fixed header plus navigation space
        const headerOffset = 280 // Increased to account for navigation position
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })

        onYearClick?.(year)
        setIsExpanded(false) // Collapse on mobile after selection
      }
    },
    [onYearClick],
  )

  if (yearSections.length <= 1) {
    return null
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className={`${styles.yearNavigation} ${styles.desktop}`}>
        <div className={styles.navHeader}>
          <Calendar className="w-4 h-4" />
          <span className={styles.navTitle}>Jump to Year</span>
        </div>

        <div className={styles.yearList}>
          {yearSections.map(({year, count, firstEntryId}) => (
            <button
              key={year}
              className={`${styles.yearButton} ${activeYear === year ? styles.active : ''}`}
              onClick={() => scrollToYear(year, firstEntryId)}
              title={`${count} events in ${year}`}
            >
              <span className={styles.yearText}>{year}</span>
              <span className={styles.eventCount}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.yearNavigation} ${styles.mobile}`}>
        <button
          className={`${styles.mobileToggle} ${isExpanded ? styles.expanded : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Calendar className="w-4 h-4" />
          <span>{activeYear || 'Years'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className={styles.mobileDropdown}>
            {yearSections.map(({year, count, firstEntryId}) => (
              <button
                key={year}
                className={`${styles.mobileYearButton} ${activeYear === year ? styles.active : ''}`}
                onClick={() => scrollToYear(year, firstEntryId)}
              >
                <span>{year}</span>
                <span className={styles.mobileEventCount}>{count} events</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

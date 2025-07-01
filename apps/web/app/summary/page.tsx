import {ArrowLeft} from 'lucide-react'
import type {Metadata} from 'next'
import Link from 'next/link'

import {sanityFetch} from '../../lib/sanity/live'
import {EXEC_SUMMARY_QUERY, SETTINGS_QUERY} from '../../lib/sanity/queries'
import type {ExecutiveSummaryData as ImportedExecutiveSummaryData} from '../../lib/types'
import StructuredData from '../components/StructuredData'
import ExecutiveSummary from '../components/Timeline/ExecutiveSummary'
import styles from '../components/Timeline/Timeline.module.css'

export const metadata: Metadata = {
  title: 'Executive Summary | 36 Warren Street Storm Drain Investigation',
  description:
    'Comprehensive executive summary of the 36 Warren Street NE storm drain investigation findings and municipal negligence documentation.',
  keywords:
    '36 warren street, storm drain investigation, executive summary, municipal negligence, infrastructure failure',
  openGraph: {
    title: 'Executive Summary | 36 Warren Street Storm Drain Investigation',
    description:
      'Comprehensive executive summary of the 36 Warren Street NE storm drain investigation findings and municipal negligence documentation.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Summary | 36 Warren Street Storm Drain Investigation',
    description:
      'Comprehensive executive summary of the 36 Warren Street NE storm drain investigation findings.',
  },
}

// Type guard for ExecutiveSummaryData (copied from Timeline component)
interface CaseOverview {
  title: string
  content: string
}

// Use the imported type instead of redefining it
type ExecutiveSummaryData = ImportedExecutiveSummaryData

function isExecutiveSummaryData(data: unknown): data is ExecutiveSummaryData {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  const caseOverview = d.caseOverview as CaseOverview | undefined
  const timelineSection = d.timelineSection as {
    title?: string
    events?: Array<{date: string; description: string}>
  }

  return (
    typeof d.title === 'string' &&
    typeof d.subtitle === 'string' &&
    typeof d.caseOverview === 'object' &&
    d.caseOverview !== null &&
    typeof caseOverview?.title === 'string' &&
    typeof caseOverview?.content === 'string' &&
    // Add proper validation for timelineSection
    typeof d.timelineSection === 'object' &&
    typeof timelineSection?.title === 'string' &&
    Array.isArray(timelineSection?.events) &&
    // Add minimal validation for other required structure
    typeof d.documentedDamages === 'object' &&
    typeof d.financialImpact === 'object' &&
    typeof d.municipalNegligence === 'object' &&
    typeof d.evidence === 'object' &&
    typeof d.conclusion === 'object'
  )
}

// Helper function to extract plain text from Sanity rich text
function getDescriptionText(description: unknown): string {
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

export default async function SummaryPage() {
  try {
    const [execSummaryResult, settingsResult] = await Promise.all([
      sanityFetch({query: EXEC_SUMMARY_QUERY}),
      sanityFetch({query: SETTINGS_QUERY}),
    ])

    const execSummary = execSummaryResult.data || execSummaryResult
    const settings = settingsResult.data || settingsResult

    return (
      <div className="min-h-screen relative overflow-hidden">
        <StructuredData
          type="article"
          title="Executive Summary | 36 Warren Street Storm Drain Investigation"
          description="Comprehensive executive summary of the 36 Warren Street NE storm drain investigation findings and municipal negligence documentation."
        />
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
              <Link
                href="/"
                className={`${styles['folder-tab']}`}
                role="tab"
                aria-selected={false}
                aria-controls="timeline-content"
              >
                Timeline
              </Link>
              <button
                className={`${styles['folder-tab']} ${styles.active}`}
                role="tab"
                aria-selected={true}
                aria-controls="summary-content"
              >
                Executive Summary
              </button>
            </nav>
          </div>
        </header>

        <div className="relative max-w-7xl mx-auto px-4" style={{paddingTop: '200px'}}>
          <ExecutiveSummary
            initialData={
              isExecutiveSummaryData(execSummary) ? (execSummary as ExecutiveSummaryData) : null
            }
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching executive summary:', error)
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className={`${styles['investigation-bg']} fixed inset-0 -z-10`} />

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Timeline
          </Link>

          <ExecutiveSummary initialData={null} />
        </div>
      </div>
    )
  }
}

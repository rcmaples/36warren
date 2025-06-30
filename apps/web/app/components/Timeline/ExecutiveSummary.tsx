'use client'

import {useEffect, useState} from 'react'

import type {ExecutiveSummaryData} from '@/lib/types'

export default function ExecutiveSummary() {
  const [data, setData] = useState<ExecutiveSummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchExecutiveSummary() {
      try {
        const response = await fetch('/api/executive-summary')
        const result = await response.json()

        if (result.success && result.executiveSummary) {
          setData(result.executiveSummary)
        } else {
          throw new Error('Failed to load executive summary')
        }
      } catch (err) {
        console.error('Error fetching executive summary:', err)
        setError('Failed to load executive summary')
        // Fallback to default data (your current hardcoded content)
        setData(getDefaultData())
      } finally {
        setIsLoading(false)
      }
    }

    fetchExecutiveSummary()
  }, [])

  // Fallback data function
  function getDefaultData(): ExecutiveSummaryData {
    return {
      title: 'Executive Summary',
      subtitle: 'Municipal Storm Drain Infrastructure Failure',
      caseOverview: {
        title: 'Case Overview',
        content:
          'A systematic failure of municipal storm drain infrastructure has resulted in repeated property flooding, significant financial damages, and ongoing safety hazards. Despite multiple reports and professional assessments, city officials have failed to address the root cause of the infrastructure failure.',
      },
      timelineSection: {
        title: 'Timeline',
        events: [
          {date: 'March 2024:', description: 'Initial complaint filed'},
          {date: 'April 2024:', description: 'Inadequate city inspection'},
          {date: 'June 2024:', description: 'Catastrophic drainage failure'},
          {date: 'August 2024:', description: 'Insufficient repair attempts'},
          {date: 'September 2024:', description: 'Continued flooding events'},
          {date: 'November 2024:', description: 'Legal action initiated'},
        ],
      },
      documentedDamages: {
        title: 'Documented Damages',
        damages: [
          'Basement flooding with contaminated water',
          'Foundation structural damage',
          'Electrical system compromise',
          'Personal property destruction',
          'Landscaping and yard damage',
        ],
      },
      financialImpact: {
        title: 'Financial Impact',
        items: [
          {label: 'Engineering Assessment:', value: '$45,000 Replacement'},
          {label: 'Property Damage:', value: 'Ongoing'},
          {label: 'Legal Costs:', value: 'Accumulating'},
        ],
      },
      municipalNegligence: {
        title: 'Municipal Negligence',
        items: [
          'Failed proper inspection',
          'Ignored engineering recommendations',
          'Implemented inadequate fixes',
          'Refused to acknowledge failure',
          'Delayed emergency response',
        ],
      },
      evidence: {
        title: 'Evidence',
        stats: [
          {number: '15+', label: 'Photos'},
          {number: '6', label: 'Events'},
          {number: '8', label: 'Months'},
        ],
      },
      conclusion: {
        title: 'Conclusion',
        content:
          'The evidence demonstrates a clear pattern of municipal negligence in maintaining critical infrastructure, resulting in preventable property damage. Immediate action is required to address the infrastructure failure and compensate for damages.',
      },
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white">Loading executive summary...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center text-red-500">
          <p>Failed to load executive summary</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {error && (
        <div className="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded">
          <p>⚠️ Using fallback data: {error}</p>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-4 font-['Arial_Black'] tracking-wide">
          {data.title}
        </h2>
        <p className="text-xl font-semibold uppercase tracking-wider text-red-500">
          {data.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Case Overview */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.caseOverview.title}
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">{data.caseOverview.content}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.timelineSection.title}
          </h3>
          <ul className="space-y-3">
            {data.timelineSection.events.map((event, index) => (
              <li key={index} className="text-base text-gray-700">
                <strong className="font-semibold text-gray-800">{event.date}</strong>{' '}
                {event.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Documented Damages */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.documentedDamages.title}
          </h3>
          <ul className="space-y-2">
            {data.documentedDamages.damages.map((damage, index) => (
              <li
                key={index}
                className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0"
              >
                {damage}
              </li>
            ))}
          </ul>
        </div>

        {/* Financial Impact */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.financialImpact.title}
          </h3>
          <div className="space-y-3">
            {data.financialImpact.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-base">
                <span className="text-gray-700">{item.label}</span>
                <span className="font-semibold text-gray-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Municipal Negligence */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.municipalNegligence.title}
          </h3>
          <ul className="space-y-2">
            {data.municipalNegligence.items.map((item, index) => (
              <li
                key={index}
                className="text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence Documentation */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.evidence.title}
          </h3>
          <div className="flex justify-around text-center">
            {data.evidence.stats.map((stat, index) => (
              <div key={index} className="text-gray-800">
                <span className="block text-4xl font-black text-red-500 font-['Arial_Black']">
                  {stat.number}
                </span>
                <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="mt-12 bg-gray-800/50 rounded-lg p-8 text-center border border-red-500/30">
        <h3 className="text-2xl font-bold text-white mb-4 font-['Arial_Black']">
          {data.conclusion.title}
        </h3>
        <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto text-lg">
          {data.conclusion.content}
        </p>
      </div>
    </div>
  )
}

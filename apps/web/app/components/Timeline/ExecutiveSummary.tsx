'use client'

import {useEffect, useState} from 'react'

import type {ExecutiveSummaryData} from '@/lib/types'

interface ExecutiveSummaryProps {
  initialData: ExecutiveSummaryData | null
}

export default function ExecutiveSummary({initialData}: ExecutiveSummaryProps) {
  const [data, setData] = useState<ExecutiveSummaryData | null>(null)
  const [isLoading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setData(initialData)
    } else {
      // No initial data - set to null for graceful fallback
      setData(null)
    }
  }, [initialData])

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
        <div className="text-center py-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mx-auto max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              No Executive Summary Available
            </h3>
            <p className="text-gray-300">
              No executive summary data has been found. Please check your Sanity Studio content or
              contact your administrator.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Case Overview */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.caseOverview.title}
          </h3>
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            {data.caseOverview.content}
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.timelineSection.title}
          </h3>
          <div className="max-h-80 overflow-y-auto pr-2">
            <ul className="space-y-3">
              {data.timelineSection.events.map((event, index) => (
                <li key={index} className="text-sm lg:text-base text-gray-700">
                  <strong className="font-semibold text-gray-800">{event.date}</strong>{' '}
                  {event.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documented Damages */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.documentedDamages.title}
          </h3>
          <div className="max-h-80 overflow-y-auto pr-2">
            <ul className="space-y-2">
              {data.documentedDamages.damages.map((damage, index) => (
                <li
                  key={index}
                  className="text-sm lg:text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0"
                >
                  {damage}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Financial Impact */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.financialImpact.title}
          </h3>
          <div className="space-y-3">
            {data.financialImpact.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start gap-4 text-sm lg:text-base"
              >
                <span className="text-gray-700 flex-1 leading-snug">{item.label}</span>
                <span className="font-semibold text-gray-900 text-right whitespace-nowrap">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Municipal Negligence */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.municipalNegligence.title}
          </h3>
          <div className="max-h-80 overflow-y-auto pr-2">
            <ul className="space-y-2">
              {data.municipalNegligence.items.map((item, index) => (
                <li
                  key={index}
                  className="text-sm lg:text-base text-gray-700 pl-5 relative before:content-['•'] before:text-red-500 before:font-bold before:absolute before:left-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Evidence Documentation */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 font-['Arial_Black']">
            {data.evidence.title}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {data.evidence.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <span className="block text-3xl font-black text-red-500 font-['Arial_Black'] mb-2">
                  {stat.number}
                </span>
                <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold leading-tight block">
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

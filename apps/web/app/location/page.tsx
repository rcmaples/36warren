import {ArrowLeft} from 'lucide-react'
import type {Metadata} from 'next'
import Link from 'next/link'

import StructuredData from '../components/StructuredData'
import styles from '../components/Timeline/Timeline.module.css'

export const metadata: Metadata = {
  title: '36 Warren Street NE - Storm Drain Infrastructure Failure Location',
  description:
    'Detailed information about the storm drain infrastructure failure at 36 Warren Street NE, Atlanta, including location details, history, and documented incidents.',
  keywords:
    '36 warren street ne, 36 warren st atlanta, storm drain location, infrastructure failure address, property address, warren street atlanta',
  openGraph: {
    title: '36 Warren Street NE - Storm Drain Infrastructure Failure Location',
    description:
      'Location details and history of storm drain infrastructure failure at 36 Warren Street NE, Atlanta',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '36 Warren Street NE - Storm Drain Infrastructure Failure Location',
    description:
      'Location details and history of storm drain infrastructure failure at 36 Warren Street NE, Atlanta',
  },
}

export default function LocationPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StructuredData
        type="investigation"
        title="36 Warren Street Storm Drain Infrastructure Failure"
        description="Comprehensive documentation of storm drain infrastructure failure at 36 Warren Street"
        address={{
          streetAddress: '36 Warren Street NE',
          addressLocality: 'Atlanta',
          addressRegion: 'GA',
          postalCode: '30317',
        }}
      />

      {/* Background */}
      <div className={`${styles['investigation-bg']} fixed inset-0 -z-10`} />

      <div className="relative max-w-4xl mx-auto px-4 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-gray-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Timeline
        </Link>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
          <h1 className="text-4xl font-bold text-white mb-6">36 Warren Street NE</h1>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-white mb-4">Location Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              36 Warren Street NE is the primary location affected by the documented storm drain
              infrastructure failure. This address has experienced repeated flooding incidents and
              property damage due to municipal negligence in maintaining proper storm water
              management systems.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">
              Storm Drain Infrastructure Issues
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Primary Concerns</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Inadequate storm drain capacity</li>
                  <li>• Poor maintenance and negligence</li>
                  <li>• Municipal response delays</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-3">Impact Areas</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Property damage</li>
                  <li>• Basement flooding incidents</li>
                  <li>• Landscape and hardscape damage</li>
                  <li>• Safety hazards</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">Geographic Context</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The storm drain issues at 36 Warren Street NE are part of a broader infrastructure
              problem affecting the Warren Street corridor. The property&apos;s location and
              elevation make it particularly vulnerable to storm water runoff and drainage failures.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">Documentation Timeline</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              This investigation documents the history of storm drain failures at 36 Warren Street
              NE, including correspondence with municipal authorities, damage assessments, and
              ongoing efforts to resolve the infrastructure issues affecting this location.
            </p>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Related Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/"
                  className="block bg-gray-900/50 p-4 rounded border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="font-semibold text-white">Timeline View</div>
                  <div className="text-gray-400 text-sm">Chronological incident documentation</div>
                </Link>
                <Link
                  href="/summary"
                  className="block bg-gray-900/50 p-4 rounded border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="font-semibold text-white">Executive Summary</div>
                  <div className="text-gray-400 text-sm">Comprehensive case overview</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import type {Metadata} from 'next'
import Link from 'next/link'

import styles from './components/Timeline/Timeline.module.css'

export const metadata: Metadata = {
  title: 'Page Not Found | 36 Warren Street Investigation',
  description:
    'The requested page could not be found on the 36 Warren Street storm drain investigation site.',
  robots: 'noindex, nofollow',
}

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className={`${styles['investigation-bg']} fixed inset-0 -z-10`} />

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 border border-gray-800 max-w-md w-full text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition-colors"
            >
              Return to Timeline
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/summary"
                className="block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm transition-colors"
              >
                Executive Summary
              </Link>
              <Link
                href="/location"
                className="block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm transition-colors"
              >
                Location Info
              </Link>
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-6">
            If you believe this is an error, please check the URL or return to the homepage.
          </p>
        </div>
      </div>
    </div>
  )
}

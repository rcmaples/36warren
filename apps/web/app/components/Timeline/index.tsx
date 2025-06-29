'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { TimelineEntry, ViewType } from '@/lib/types';
import { processSanityEntry, mockTimelineData } from '@/lib/data';
import TimelineItem from './TimelineItem';
import TimelineModal from './TimelineModal';
import ExecutiveSummary from './ExecutiveSummary';
import styles from './Timeline.module.css';

export default function Timeline() {
  const [mounted, setMounted] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('timeline');
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>(null);
  // Helper function to extract plain text from Sanity rich text
  const getDescriptionText = (description: any): string => {
    if (!description) return '';
    
    // If it's already a string, return it
    if (typeof description === 'string') return description;
    
    // If it's rich text (array of blocks), extract text
    if (Array.isArray(description)) {
      return description
        .filter(block => block._type === 'block')
        .map(block => 
          block.children
            ?.filter((child: any) => child._type === 'span')
            .map((child: any) => child.text)
            .join('')
        )
        .join(' ')
        .trim();
    }
    
    return '';
  };

  // Fetch timeline data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch both timeline entries and settings in parallel
        const [entriesResponse, settingsResponse] = await Promise.all([
          fetch('/api/entries'),
          fetch('/api/settings')
        ]);
        
        const entriesData = await entriesResponse.json();
        const settingsData = await settingsResponse.json();
        
        // Handle timeline data
        if (entriesData.success && entriesData.entries && entriesData.entries.length > 0) {
          const processedEntries = entriesData.entries.map(processSanityEntry);
          setTimelineData(processedEntries);
        } else {
          // Fallback to mock data if no Sanity data available
          console.warn('No entries found in Sanity, using mock data');
          setTimelineData(mockTimelineData as any);
        }
        
        // Handle settings data
        if (settingsData.success && settingsData.settings) {
          setSettings(settingsData.settings);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data');
        // Fallback to mock data on error
        setTimelineData(mockTimelineData as any);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback((entry: TimelineEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  }, []);

  const switchView = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const memoizedTimelineItems = useMemo(() => {
    return timelineData.map((item, index) => (
      <TimelineItem
        key={item._id || `${item.date}-${index}`}
        item={item}
        index={index}
        onOpenModal={openModal}
      />
    ));
  }, [timelineData, openModal]);

  if (!mounted) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading timeline data...</p>
        </div>
      </div>
    );
  }

  // Error state (still show interface with fallback data)
  if (error && timelineData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading timeline data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className={`${styles['investigation-bg']} fixed inset-0 -z-10`} />

      {/* Error banner if using fallback data */}
      {error && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-400 text-yellow-800 px-4 py-2 text-sm z-50">
          <p>⚠️ Using fallback data due to loading error: {error}</p>
        </div>
      )}

      {/* Header with integrated tabs */}
      <header className={`${styles.banner} fixed top-0 left-0 right-0 z-40 px-4 py-6`} style={{ marginTop: error ? '40px' : '0' }}>
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
          style={{ paddingTop: error ? '260px' : '200px' }}
        >
          {/* Central Timeline Line */}
          <div className={`${styles['timeline-line']} absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 z-0`} />

          {/* Timeline Items */}
          <div className="relative z-10">
            {timelineData.length > 0 ? (
              memoizedTimelineItems
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600">No timeline entries found.</p>
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
          style={{ paddingTop: error ? '260px' : '200px' }}
        >
          <ExecutiveSummary />
        </main>
      )}

      {/* Modal */}
      <TimelineModal
        selectedEntry={selectedEntry}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

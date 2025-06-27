'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { timelineData } from '@/lib/data';
import { TimelineEntry, ViewType } from '@/lib/types';
import TimelineItem from './TimelineItem';
import TimelineModal from './TimelineModal';
import ExecutiveSummary from './ExecutiveSummary';
import styles from './Timeline.module.css';

export default function Timeline() {
  const [mounted, setMounted] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('timeline');

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
        key={`${item.date}-${index}`}
        item={item}
        index={index}
        onOpenModal={openModal}
      />
    ));
  }, [openModal]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className={`${styles['investigation-bg']} fixed inset-0 -z-10`} />

      {/* Header with integrated tabs */}
      <header className={`${styles.banner} fixed top-0 left-0 right-0 z-50 px-4 py-6`}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={styles['banner-title']}>STORM DRAIN INVESTIGATION</h1>
          <p className={styles['banner-subtitle']}>Municipal Negligence Documentation</p>

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
          style={{ paddingTop: '200px' }}
        >
          {/* Central Timeline Line */}
          <div className={`${styles['timeline-line']} absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 z-0`} />

          {/* Timeline Items */}
          <div className="relative z-10">
            {memoizedTimelineItems}
          </div>
        </main>
      )}

      {currentView === 'summary' && (
        <main
          id="summary-content"
          role="tabpanel"
          aria-labelledby="summary-tab"
          className="relative"
          style={{ paddingTop: '200px' }}
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

import { useEffect, useCallback } from 'react';
import { TimelineEntry } from '@/lib/types';
import ImageCarousel from './ImageCarousel';
import styles from './Timeline.module.css';

interface TimelineModalProps {
  selectedEntry: TimelineEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TimelineModal({ selectedEntry, isOpen, onClose }: TimelineModalProps) {
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen || !selectedEntry) return null;

  // Get images from either gallery (Sanity) or images (legacy)
  const entryImages = (selectedEntry as any).images || [];
  const hasImages = entryImages && entryImages.length > 0;

  return (
    <div
      className={`${styles['modal-overlay']} fixed inset-0 z-[100] flex items-center justify-center p-4`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${styles['modal-content']} relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`${styles['close-button']} absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold z-10`}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className={styles['modal-date']}>{selectedEntry.date}</div>
        <h2 className={styles['modal-title']}>
          {(selectedEntry.name || (selectedEntry as any).title)?.replace(/_/g, ' ')}
        </h2>

        {hasImages && (
          <ImageCarousel images={entryImages} />
        )}

        <p className={styles['modal-description']}>
          {selectedEntry.fullDescription}
        </p>
      </div>
    </div>
  );
}

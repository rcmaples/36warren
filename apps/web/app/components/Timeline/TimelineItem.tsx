import React from 'react';
import { TimelineEntry } from '@/lib/types';
import PeopleIndicators from './PeopleIndicators';
import styles from './Timeline.module.css';

interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
  onOpenModal: (entry: TimelineEntry) => void;
}

const TimelineItem = React.memo(function TimelineItem({ item, index, onOpenModal }: TimelineItemProps) {
  const severityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#dc2626',
    critical: '#991b1b',
  };
  
  // Use impact if available, fallback to severity for backward compatibility
  const impactLevel = item.impact || (item as any).severity || 'medium';
  const dotColor = severityColors[impactLevel as keyof typeof severityColors] || '#6b7280';

  // Check if item has images (either Sanity gallery or legacy images)
  const hasImages = (item.gallery && item.gallery.length > 0) || ((item as any).images && (item as any).images.length > 0);
  const imageCount = item.gallery?.length || (item as any).images?.length || 0;

  return (
    <div className={`${styles['timeline-item']} ${styles[index % 2 === 0 ? 'left' : 'right']}`}>
      <article
        className={`${styles['timeline-card']} ${styles[`severity-${impactLevel}`]}`}
        onClick={() => onOpenModal(item)}
        style={{
          paddingTop: item.impact ? '35px' : '20px' // Add extra space when impact badge is present
        }}
      >
        {hasImages && (
          <div
            className={styles['photo-indicator']}
            title={`${imageCount} evidence photos`}
            style={{
              top: item.impact ? '35px' : '20px', // Align with date text position
              right: '15px' // Position from right edge
            }}
          >
            📄
          </div>
        )}
        {/* Only show impact badge if impact is defined */}
        {item.impact && (
          <div className={`${styles['severity-badge']} ${styles[item.impact]}`}>
            {item.impact}
          </div>
        )}
        <time className={`${styles['date-text']} block`}>{item.date}</time>
        <h3 className={styles['title-text']}>
          {(item.name || (item as any).title)?.replace(/_/g, ' ')}
        </h3>
        <p className={styles['description-text']}>
          {item.shortDescription || (item as any).description}
        </p>
        
        {/* People indicators */}
        {item.people && item.people.length > 0 && (
          <div className={styles['people-indicators']}>
            <PeopleIndicators people={item.people} />
          </div>
        )}
      </article>
      <div
        className={styles['timeline-dot']}
        style={{ background: dotColor }}
      />
      <div className={styles['timeline-connector']} />
    </div>
  );
});

export default TimelineItem;

import React from 'react';
import { TimelineEntry } from '@/lib/types';
import styles from './Timeline.module.css';

interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
  onOpenModal: (entry: TimelineEntry) => void;
}

const TimelineItem = React.memo(function TimelineItem({ item, index, onOpenModal }: TimelineItemProps) {
  const severityColors = {
    medium: '#f59e0b',
    high: '#dc2626',
    critical: '#991b1b',
  };
  
  const dotColor = severityColors[item.severity] || '#6b7280';

  return (
    <div className={`${styles['timeline-item']} ${styles[index % 2 === 0 ? 'left' : 'right']}`}>
      <article
        className={`${styles['timeline-card']} ${styles[`severity-${item.severity}`]}`}
        onClick={() => onOpenModal(item)}
      >
        {item.images && (
          <div
            className={styles['photo-indicator']}
            title={`${item.images.length} evidence photos`}
          >
            📄
          </div>
        )}
        <div className={`${styles['severity-badge']} ${styles[item.severity]}`}>
          {item.severity}
        </div>
        <time className={`${styles['date-text']} block`}>{item.date}</time>
        <h3 className={styles['title-text']}>
          {item.title.replace(/_/g, ' ')}
        </h3>
        <p className={styles['description-text']}>{item.description}</p>
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

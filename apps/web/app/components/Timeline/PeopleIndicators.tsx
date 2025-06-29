import React from 'react';
import { SanityPerson } from '@/lib/types';
import PersonAvatar from './PersonAvatar';
import styles from './Timeline.module.css';

interface PeopleIndicatorsProps {
  people: SanityPerson[];
  maxVisible?: number;
}

function PeopleIndicators({ people, maxVisible = 5 }: PeopleIndicatorsProps) {
  if (!people || people.length === 0) {
    return null;
  }

  const visiblePeople = people.slice(0, maxVisible);
  const remainingCount = Math.max(0, people.length - maxVisible);

  return (
    <>
      {visiblePeople.map((person, index) => (
        <div 
          key={person._id}
          className={styles['person-indicator']}
          style={{
            zIndex: visiblePeople.length - index, // Later avatars appear behind earlier ones
            marginLeft: index > 0 ? '-8px' : '0' // Overlap avatars
          }}
        >
          <PersonAvatar person={person} size={28} />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div 
          className={`${styles['person-indicator']} ${styles['remaining-count']}`}
          style={{
            zIndex: 0,
            marginLeft: '-8px'
          }}
          title={`+${remainingCount} more people`}
        >
          <div className={styles['person-avatar']} style={{ width: 28, height: 28, backgroundColor: '#6b7280' }}>
            <span className={styles['avatar-initials']}>+{remainingCount}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default PeopleIndicators;

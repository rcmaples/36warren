import Image from 'next/image'
import React from 'react'

import type {SanityPerson} from '@/lib/types'

import styles from './Timeline.module.css'

interface PersonAvatarProps {
  person: SanityPerson
  size?: number
}

const PersonAvatar: React.FC<PersonAvatarProps> = ({person, size = 28}) => {
  const [imageError, setImageError] = React.useState(false)

  // Early return if person is invalid
  if (!person?.name) {
    return null
  }

  // Check if we have a valid Sanity image
  const hasValidImage =
    person.avatar?.asset?._ref && person.avatar.asset._type === 'reference' && !imageError

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  // Generate a consistent color based on the person's name
  const getAvatarColor = (name: string) => {
    const colors = [
      '#f59e0b',
      '#ec4899',
      '#10b981',
      '#8b5cf6',
      '#f97316',
      '#06b6d4',
      '#84cc16',
      '#ef4444',
    ]

    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  // Build Sanity image URL manually
  const buildImageUrl = (assetRef: string) => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mrsdi6mo'
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '36warren'

    const match = assetRef.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
    if (!match) return null

    const [, id, dimensions, format] = match
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${size}&h=${size}&fit=crop&crop=center`
  }

  const initials = getInitials(person.name)
  const backgroundColor = getAvatarColor(person.name)
  const imageUrl = hasValidImage ? buildImageUrl(person.avatar?.asset?._ref!) : null

  return (
    <div
      className={styles['person-avatar']}
      title={`${person.name}${person.jobTitle ? ` - ${person.jobTitle}` : ''}`}
      style={{
        width: size,
        height: size,
        backgroundColor: imageUrl ? 'transparent' : backgroundColor,
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={person.name}
          width={size}
          height={size}
          className={styles['avatar-image']}
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
          onError={() => setImageError(true)}
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) {
              setImageError(true)
            }
          }}
        />
      ) : (
        <span className={styles['avatar-initials']}>{initials}</span>
      )}
    </div>
  )
}

export default PersonAvatar

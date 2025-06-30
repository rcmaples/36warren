import React from 'react'

import {urlFor} from '@/lib/sanity/image'
import type {SanityPerson} from '@/lib/types'

import styles from './Timeline.module.css'

interface PersonAvatarProps {
  person: SanityPerson
  size?: number
}

const PersonAvatar: React.FC<PersonAvatarProps> = ({person, size = 28}) => {
  const [imageError, setImageError] = React.useState(false)
  // Generate avatar URL from Sanity if available
  const getAvatarUrl = () => {
    // Check if we have complete avatar data
    if (!person.avatar?.asset) {
      return null
    }

    try {
      // Use Sanity's official image URL builder
      let imageBuilder = urlFor(person.avatar)
        .width(size)
        .height(size)
        .fit('crop')
        .auto('format')
        .quality(85)

      // Use hotspot if available, otherwise center crop
      if (person.avatar.hotspot) {
        imageBuilder = imageBuilder.focalPoint(person.avatar.hotspot.x, person.avatar.hotspot.y)
      } else {
        imageBuilder = imageBuilder.crop('center')
      }

      return imageBuilder.url()
    } catch (error) {
      console.warn('Failed to generate avatar URL:', error)
      return null
    }
  }

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
      '#f59e0b', // amber
      '#ec4899', // pink
      '#10b981', // emerald
      '#8b5cf6', // violet
      '#f97316', // orange
      '#06b6d4', // cyan
      '#84cc16', // lime
      '#ef4444', // red
    ]

    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const avatarUrl = getAvatarUrl()
  const initials = getInitials(person.name)
  const backgroundColor = getAvatarColor(person.name)

  // Use initials if image failed to load or no image available
  const shouldShowImage = avatarUrl && !imageError

  return (
    <div
      className={styles['person-avatar']}
      title={`${person.name}${person.jobTitle ? ` - ${person.jobTitle}` : ''}`}
      style={{
        width: size,
        height: size,
        backgroundColor: shouldShowImage ? 'transparent' : backgroundColor,
      }}
    >
      {shouldShowImage ? (
        <img
          src={avatarUrl}
          alt={person.name}
          className={styles['avatar-image']}
          onError={() => {
            console.warn(`Failed to load avatar for ${person.name}:`, avatarUrl)
            setImageError(true)
          }}
        />
      ) : (
        <span className={styles['avatar-initials']}>{initials}</span>
      )}
    </div>
  )
}

export default PersonAvatar

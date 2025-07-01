import {ChevronLeftIcon, ChevronRightIcon} from '@sanity/icons'
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react'

import type {TimelineImage} from '@/lib/types'

import styles from './Timeline.module.css'

interface ImageCarouselProps {
  images: TimelineImage[]
}

// Constants
const KEYBOARD_KEYS = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
} as const

export default function ImageCarousel({images}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait' | null>(null)

  // Navigation helpers
  const navigateToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setImageOrientation(null) // Reset orientation when changing images
  }, [])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    setImageOrientation(null)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setImageOrientation(null)
  }, [images.length])

  // Handle keyboard navigation
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (images.length <= 1) return

      if (e.key === KEYBOARD_KEYS.ARROW_RIGHT) {
        e.preventDefault()
        nextImage()
      } else if (e.key === KEYBOARD_KEYS.ARROW_LEFT) {
        e.preventDefault()
        prevImage()
      }
    },
    [nextImage, prevImage, images.length],
  )

  // Add keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const handleImageClick = useCallback(() => {
    window.open(images[currentImageIndex].originalUrl, '_blank')
  }, [images, currentImageIndex])

  // Handle image load to detect orientation
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const orientation = img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait'
    setImageOrientation(orientation)
  }, [])

  if (!images || images.length === 0) return null

  return (
    <div className={styles['carousel-container']}>
      <Image
        src={images[currentImageIndex].url || '/placeholder.svg'}
        alt={images[currentImageIndex].caption}
        width={0}
        height={0}
        sizes="100vw"
        className={`${styles['carousel-image']} ${styles['clickable-image']} ${
          imageOrientation === 'landscape'
            ? styles['image-landscape']
            : imageOrientation === 'portrait'
              ? styles['image-portrait']
              : styles['image-loading']
        }`}
        onClick={handleImageClick}
        title="Click to view full size image"
        onLoad={handleImageLoad}
      />

      {images.length > 1 && (
        <>
          <button
            className={`${styles['carousel-nav']} ${styles.prev}`}
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeftIcon style={{fontSize: '24px'}} />
          </button>
          <button
            className={`${styles['carousel-nav']} ${styles.next}`}
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRightIcon style={{fontSize: '24px'}} />
          </button>

          <div className={styles['carousel-indicators']}>
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`${styles['carousel-indicator']} ${
                  idx === currentImageIndex ? styles.active : ''
                }`}
                onClick={() => navigateToImage(idx)}
                aria-label={`View images ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

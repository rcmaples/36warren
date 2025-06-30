import Image from 'next/image'
import {useCallback, useState} from 'react'

import type {TimelineImage} from '@/lib/types'

import styles from './Timeline.module.css'

interface ImageCarouselProps {
  images: TimelineImage[]
}

export default function ImageCarousel({images}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const handleImageClick = useCallback(() => {
    window.open(images[currentImageIndex].url, '_blank')
  }, [images, currentImageIndex])

  if (!images || images.length === 0) return null

  return (
    <div className={styles['carousel-container']}>
      <Image
        src={images[currentImageIndex].url || '/placeholder.svg'}
        alt={images[currentImageIndex].caption}
        width={800}
        height={600}
        className={`${styles['carousel-image']} ${styles['clickable-image']}`}
        onClick={handleImageClick}
        title="Click to view full size evidence"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />

      {images.length > 1 && (
        <>
          <button
            className={`${styles['carousel-nav']} ${styles.prev}`}
            onClick={prevImage}
            aria-label="Previous evidence"
          >
            ‹
          </button>
          <button
            className={`${styles['carousel-nav']} ${styles.next}`}
            onClick={nextImage}
            aria-label="Next evidence"
          >
            ›
          </button>

          <div className={styles['carousel-indicators']}>
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`${styles['carousel-indicator']} ${
                  idx === currentImageIndex ? styles.active : ''
                }`}
                onClick={() => setCurrentImageIndex(idx)}
                aria-label={`View evidence ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className={styles['image-caption']}>{images[currentImageIndex].caption}</div>
    </div>
  )
}

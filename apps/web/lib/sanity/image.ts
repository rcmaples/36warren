import createImageUrlBuilder from '@sanity/image-url'
import {type SanityImageSource} from '@sanity/image-url/lib/types/types'

import type {SanityImage, TimelineImage} from '../types'
import {dataset, projectId} from './api'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({projectId, dataset})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Helper function to convert Sanity images to timeline image format
export const convertSanityImageToTimelineImage = (
  sanityImage: SanityImage,
): TimelineImage | null => {
  if (!sanityImage?.asset?._ref) {
    return null
  }

  try {
    const imageBuilder = urlFor(sanityImage.asset).width(800).height(600).fit('max').auto('format')

    // Apply crop and hotspot if available
    if (sanityImage.crop) {
      imageBuilder.rect(
        sanityImage.crop.left || 0,
        sanityImage.crop.top || 0,
        1 - (sanityImage.crop.left || 0) - (sanityImage.crop.right || 0),
        1 - (sanityImage.crop.top || 0) - (sanityImage.crop.bottom || 0),
      )
    }

    if (sanityImage.hotspot) {
      imageBuilder.focalPoint(sanityImage.hotspot.x, sanityImage.hotspot.y)
    }

    return {
      url: imageBuilder.url(),
      caption: sanityImage.alt || '',
    }
  } catch (error) {
    console.warn('Failed to process Sanity image:', error)
    return null
  }
}

// Helper function to get optimized image URL for different sizes
export const getOptimizedImageUrl = (
  sanityImage: SanityImage,
  width: number = 800,
  height: number = 600,
): string | null => {
  if (!sanityImage?.asset?._ref) {
    return null
  }

  try {
    const imageBuilder = urlFor(sanityImage.asset)
      .width(width)
      .height(height)
      .fit('max')
      .auto('format')
      .quality(85)

    // Apply crop and hotspot if available
    if (sanityImage.crop) {
      imageBuilder.rect(
        sanityImage.crop.left || 0,
        sanityImage.crop.top || 0,
        1 - (sanityImage.crop.left || 0) - (sanityImage.crop.right || 0),
        1 - (sanityImage.crop.top || 0) - (sanityImage.crop.bottom || 0),
      )
    }

    if (sanityImage.hotspot) {
      imageBuilder.focalPoint(sanityImage.hotspot.x, sanityImage.hotspot.y)
    }

    return imageBuilder.url()
  } catch (error) {
    console.warn('Failed to generate optimized image URL:', error)
    return null
  }
}

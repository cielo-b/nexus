import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

/**
 * Utility function to get Sanity image URL with proper fallback
 * @param image - Sanity image object with asset reference
 * @param fallback - Fallback image path (default: '/placeholder.jpg')
 * @returns Complete image URL or fallback
 */
export const getSanityImage = (
  image: SanityImageSource | null | undefined,
  fallback: string = '/placeholder.jpg'
): string => {
  if (!image || !image.asset) {
    return fallback
  }

  try {
    return urlFor(image).url() || fallback
  } catch (error) {
    console.warn('Error generating Sanity image URL:', error)
    return fallback
  }
}

/**
 * Utility function to get Sanity image URL with specific dimensions
 * @param image - Sanity image object with asset reference
 * @param width - Desired width
 * @param height - Desired height
 * @param fallback - Fallback image path (default: '/placeholder.jpg')
 * @returns Complete image URL with dimensions or fallback
 */
export const getSanityImageWithDimensions = (
  image: SanityImageSource | null | undefined,
  width: number,
  height: number,
  fallback: string = '/placeholder.jpg'
): string => {
  if (!image || !image.asset) {
    return fallback
  }

  try {
    return urlFor(image).width(width).height(height).url() || fallback
  } catch (error) {
    console.warn('Error generating Sanity image URL with dimensions:', error)
    return fallback
  }
}

/**
 * Utility function to get Sanity image URL with quality and format options
 * @param image - Sanity image object with asset reference
 * @param options - Image transformation options
 * @param fallback - Fallback image path (default: '/placeholder.jpg')
 * @returns Complete image URL with options or fallback
 */
export const getSanityImageWithOptions = (
  image: SanityImageSource | null | undefined,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  } = {},
  fallback: string = '/placeholder.jpg'
): string => {
  if (!image || !image.asset) {
    return fallback
  }

  try {
    let builder = urlFor(image)
    
    if (options.width) builder = builder.width(options.width)
    if (options.height) builder = builder.height(options.height)
    if (options.quality) builder = builder.quality(options.quality)
    if (options.format) builder = builder.format(options.format)
    if (options.fit) builder = builder.fit(options.fit)
    
    return builder.url() || fallback
  } catch (error) {
    console.warn('Error generating Sanity image URL with options:', error)
    return fallback
  }
}

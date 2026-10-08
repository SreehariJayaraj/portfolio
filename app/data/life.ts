export type LifePhoto = {
  src: string
  alt?: string
}

/**
 * Photos for the /life page are loaded automatically from the `public/life/`
 * folder — just drop image files in there (named 1.jpg, 2.jpg, ... to control
 * order) and they appear. No code changes needed.
 *
 * Optionally, add external image URLs (direct links ending in .jpg/.png, from a
 * CDN) here — they'll be appended after the folder images.
 */
export const manualPhotos: Array<LifePhoto | string> = [
  // 'https://your-cdn.com/photo.jpg',
  // { src: 'https://your-cdn.com/photo-2.jpg', alt: 'Sunset over the hills' },
]

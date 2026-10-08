import fs from 'fs'
import path from 'path'
import { manualPhotos, type LifePhoto } from 'app/data/life'

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

function toAlt(file: string) {
  return path
    .basename(file, path.extname(file))
    .replace(/^\d+[-_]/, '') // drop leading ordering prefix like "3-"
    .replace(/[-_]+/g, ' ')
    .trim()
}

function normalize(photo: LifePhoto | string): LifePhoto {
  return typeof photo === 'string' ? { src: photo } : photo
}

/**
 * Reads every image in `public/life/` at build time, sorted by filename
 * (natural order, so 1, 2, 10 sort correctly), then appends any manualPhotos.
 */
export function getLifePhotos(): LifePhoto[] {
  const dir = path.join(process.cwd(), 'public', 'life')

  let folderPhotos: LifePhoto[] = []
  try {
    folderPhotos = fs
      .readdirSync(dir)
      .filter((file) => IMAGE_EXT.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => ({ src: `/life/${file}`, alt: toAlt(file) }))
  } catch {
    // public/life/ doesn't exist yet — just use manual photos.
  }

  return [...folderPhotos, ...manualPhotos.map(normalize)]
}

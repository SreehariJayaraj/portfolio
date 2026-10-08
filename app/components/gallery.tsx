'use client'

import { useCallback, useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { BottomSheet } from './bottom-sheet'
import type { LifePhoto } from 'app/data/life'

// react-masonry-css: keys are max-widths, values are column counts at/below them.
const breakpointCols = {
  default: 4,
  1024: 3,
  640: 2,
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -48 : 48, opacity: 0 }),
}

function normalize(photo: LifePhoto | string): LifePhoto {
  return typeof photo === 'string' ? { src: photo } : photo
}

function ControlButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string
  onClick: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 ${className ?? ''}`}
    >
      {children}
    </button>
  )
}

export function Gallery({ photos }: { photos: Array<LifePhoto | string> }) {
  const reduce = useReducedMotion()
  const items = photos.map(normalize)

  const [index, setIndex] = useState<number | null>(null)
  const [dir, setDir] = useState(0)
  const open = index !== null
  const active = index !== null ? items[index] : null

  const openAt = useCallback((i: number) => {
    setDir(0)
    setIndex(i)
  }, [])
  const close = useCallback(() => setIndex(null), [])
  const paginate = useCallback(
    (d: number) => {
      setDir(d)
      setIndex((i) => (i === null ? i : (i + d + items.length) % items.length))
    },
    [items.length]
  )
  const prev = useCallback(() => paginate(-1), [paginate])
  const next = useCallback(() => paginate(1), [paginate])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, prev, next])

  if (items.length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-500">
        No photos yet — drop some image files into{' '}
        <code>public/life/</code>.
      </p>
    )
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointCols}
        className="-ml-3 flex w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {items.map((photo, i) => (
          <motion.button
            key={`${photo.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            aria-label={photo.alt ? `Open photo: ${photo.alt}` : 'Open photo'}
            className="group mb-3 block w-full cursor-zoom-in overflow-hidden rounded-xl bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:bg-neutral-900 dark:focus-visible:ring-neutral-100"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: Math.min(i, 10) * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt ?? ''}
              loading="lazy"
              decoding="async"
              className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </motion.button>
        ))}
      </Masonry>

      <BottomSheet open={open} onClose={close} label={active?.alt || 'Photo'}>
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            {active && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <motion.img
                key={index}
                src={active.src}
                alt={active.alt ?? ''}
                draggable={false}
                custom={dir}
                variants={reduce ? undefined : slideVariants}
                initial={reduce ? false : 'enter'}
                animate={reduce ? undefined : 'center'}
                exit={reduce ? undefined : 'exit'}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="max-h-full w-full object-contain sm:max-h-[85vh] sm:w-auto sm:max-w-[92vw]"
              />
            )}
          </AnimatePresence>

          <ControlButton label="Close" onClick={close} className="right-3 top-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </ControlButton>

          {items.length > 1 && (
            <>
              <ControlButton
                label="Previous photo"
                onClick={prev}
                className="left-3 top-1/2 -translate-y-1/2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ControlButton>
              <ControlButton
                label="Next photo"
                onClick={next}
                className="right-3 top-1/2 -translate-y-1/2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ControlButton>
            </>
          )}
        </div>

        {active && (
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="truncate capitalize">{active.alt}</span>
            {items.length > 1 && (
              <span className="shrink-0 tabular-nums text-neutral-400 dark:text-neutral-500">
                {index! + 1} / {items.length}
              </span>
            )}
          </div>
        )}
      </BottomSheet>
    </>
  )
}

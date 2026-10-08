'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { Drawer } from '@base-ui/react/drawer'

/** Tracks whether the viewport is desktop-sized (>= 640px). */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

type BottomSheetProps = {
  open: boolean
  onClose: () => void
  /** Accessible label for the dialog (visually hidden). */
  label?: string
  children: ReactNode
}

/**
 * Adaptive overlay: a full-height bottom sheet on mobile (Base UI Drawer —
 * native swipe/drag-to-dismiss with a grab handle), and a centered modal on
 * desktop (Base UI Dialog). Both animate open/close via CSS.
 */
export function BottomSheet({
  open,
  onClose,
  label,
  children,
}: BottomSheetProps) {
  const desktop = useIsDesktop()
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  if (desktop) {
    return (
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-fit max-w-[92vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white outline-none transition-[transform,opacity] duration-200 ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:bg-neutral-950">
            <Dialog.Title className="sr-only">{label || 'Photo'}</Dialog.Title>
            {children}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <Drawer.Root open={open} onOpenChange={handleOpenChange} swipeDirection="down">
      <Drawer.Portal>
        <Drawer.Backdrop className="sheet-backdrop" />
        <Drawer.Viewport className="sheet-viewport">
          <Drawer.Popup className="sheet-popup">
            {/* Grab handle — drag the sheet down to dismiss */}
            <div className="flex shrink-0 cursor-grab justify-center pb-1 pt-3 active:cursor-grabbing">
              <div className="h-1.5 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <Drawer.Content className="flex min-h-0 flex-1 flex-col">
              <Drawer.Title className="sr-only">{label || 'Photo'}</Drawer.Title>
              {children}
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

declare module 'react-masonry-css' {
  import type { ComponentType, ReactNode } from 'react'

  interface MasonryProps {
    breakpointCols?: number | { default: number; [breakpoint: number]: number }
    className?: string
    columnClassName?: string
    children?: ReactNode
    [key: string]: unknown
  }

  const Masonry: ComponentType<MasonryProps>
  export default Masonry
}

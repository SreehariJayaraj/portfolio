'use client'

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from 'motion/react'

const easeOut = [0.16, 1, 0.3, 1] as const

/**
 * Fades + lifts its children in as they scroll into view. Plays once.
 * Respects `prefers-reduced-motion` by rendering content statically.
 */
export function Reveal({
  delay = 0,
  y = 12,
  children,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Fades + lifts its children in on mount — use for above-the-fold content
 * that should animate immediately rather than on scroll.
 */
export function FadeIn({
  delay = 0,
  y = 12,
  children,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
}

/** Wrap a list in this and each <StaggerItem> child reveals in sequence. */
export function Stagger({
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-40px' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<'div'>) {
  const reduce = useReducedMotion()

  return (
    <motion.div variants={reduce ? undefined : itemVariants} {...props}>
      {children}
    </motion.div>
  )
}

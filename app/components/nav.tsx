'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

const navItems = {
  '/': { name: 'home' },
  '/blog': { name: 'blog' },
  '/life': { name: 'life' },
  'https://dub.sh/sreehari-resume': { name: 'resume' },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="mb-16 tracking-tight">
      <nav className="flex flex-row items-center" id="nav">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isExternal = path.startsWith('http')
          const isActive =
            !isExternal && (path === '/' ? pathname === '/' : pathname.startsWith(path))

          return (
            <Link
              key={path}
              href={path}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              aria-current={isActive ? 'page' : undefined}
              className={`relative px-3 py-1 text-sm transition-colors first:pl-0 ${
                isActive
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100'
              }`}
            >
              {name}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-neutral-900 first:left-0 dark:bg-neutral-100"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

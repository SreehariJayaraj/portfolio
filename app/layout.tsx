import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Sreehari Jayaraj',
    template: '%s | Sreehari Jayaraj',
  },
  description:
    'Sreehari Jayaraj is a full-stack developer from Kerala, India, building highly interactive UIs.',
  openGraph: {
    title: 'Sreehari Jayaraj',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'Sreehari Jayaraj',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-sky-500/90 selection:text-white dark:bg-neutral-950 dark:text-neutral-100">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 pt-16 pb-8 sm:pt-24">
          <Navbar />
          <div className="flex-auto">{children}</div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}

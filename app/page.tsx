import { BlogPosts } from 'app/components/posts'
import { Experience } from 'app/components/experience'
import { FadeIn, Reveal } from 'app/components/motion'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
      {children}
    </h2>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col gap-20">
      {/* Hero */}
      <FadeIn>
        <h1 className="mb-6 text-3xl font-semibold tracking-tighter text-neutral-900 sm:text-4xl dark:text-neutral-50">
          Sreehari Jayaraj
        </h1>

        <div className="flex flex-col gap-4 text-neutral-700 dark:text-neutral-300">
          <p>
            I’m a frontend-leaning full-stack developer who enjoys building
            highly interactive UIs and smooth animations.
          </p>

          <p>
            I’ve worked across multiple stacks including NestJS and Python,
            giving me a well-rounded understanding of product development.
          </p>

          <p>
            Currently, I’m a Software Engineer at{' '}
            <a
              href="https://www.headout.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
            >
              Headout
            </a>
            , on the Post-Purchase team — building internal tools for Ops and
            microfrontends (plus React Native apps) for our customer-facing
            platforms.
          </p>
        </div>
      </FadeIn>

      {/* Experience */}
      <Reveal>
        <SectionLabel>Experience</SectionLabel>
        <Experience />
      </Reveal>

      {/* Writing */}
      <Reveal>
        <SectionLabel>Writing</SectionLabel>
        <BlogPosts />
      </Reveal>
    </div>
  )
}

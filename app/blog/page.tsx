import { BlogPosts } from 'app/components/posts'
import { FadeIn } from 'app/components/motion'

export const metadata = {
  title: 'Blog',
  description: 'Notes on frontend, interviews, and building things.',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <FadeIn>
        <h1 className="text-3xl font-semibold tracking-tighter text-neutral-900 sm:text-4xl dark:text-neutral-50">
          Writing
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Notes on frontend, interviews, and the things I build along the way.
        </p>
      </FadeIn>

      <BlogPosts detailed />
    </div>
  )
}

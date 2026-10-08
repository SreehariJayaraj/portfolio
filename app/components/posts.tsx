import Link from 'next/link'
import { formatDate, getBlogPosts, readingTime } from 'app/blog/utils'
import { Stagger, StaggerItem } from './motion'

export function BlogPosts({ detailed = false }: { detailed?: boolean }) {
  const allBlogs = getBlogPosts().sort(
    (a, b) =>
      +new Date(b.metadata.publishedAt) - +new Date(a.metadata.publishedAt)
  )

  if (allBlogs.length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-500">
        Nothing published yet — check back soon.
      </p>
    )
  }

  if (detailed) {
    return (
      <Stagger className="flex flex-col gap-2">
        {allBlogs.map((post) => (
          <StaggerItem key={post.slug}>
            <Link
              className="group -mx-4 block rounded-xl px-4 py-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
              href={`/blog/${post.slug}`}
            >
              <div className="mb-1.5 flex items-center gap-2 text-xs tabular-nums text-neutral-500 dark:text-neutral-500">
                <span>{formatDate(post.metadata.publishedAt, false)}</span>
                <span aria-hidden>·</span>
                <span>{readingTime(post.content)} min read</span>
              </div>

              <h2 className="flex items-center gap-1 text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.metadata.title}
                <span className="text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </h2>

              {post.metadata.summary && (
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {post.metadata.summary}
                </p>
              )}
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    )
  }

  return (
    <Stagger className="flex flex-col">
      {allBlogs.map((post) => (
        <StaggerItem key={post.slug}>
          <Link
            className="group -mx-3 flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-100 sm:flex-row sm:items-baseline sm:gap-4 dark:hover:bg-neutral-900"
            href={`/blog/${post.slug}`}
          >
            <p className="w-[110px] shrink-0 text-sm tabular-nums text-neutral-500 dark:text-neutral-500">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="tracking-tight text-neutral-800 transition-colors group-hover:text-neutral-950 dark:text-neutral-200 dark:group-hover:text-neutral-50">
              {post.metadata.title}
            </p>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

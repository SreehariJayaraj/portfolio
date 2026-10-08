import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts, readingTime } from 'app/blog/utils'
import { FadeIn } from 'app/components/motion'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type BlogPageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Sreehari Jayaraj',
            },
          }),
        }}
      />
      <FadeIn>
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
            ←
          </span>
          Back to writing
        </Link>

        <h1 className="title text-3xl font-semibold tracking-tighter text-neutral-900 sm:text-4xl dark:text-neutral-50">
          {post.metadata.title}
        </h1>

        <div className="mt-3 mb-10 flex items-center gap-2 text-sm tabular-nums text-neutral-500 dark:text-neutral-500">
          <span>{formatDate(post.metadata.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{readingTime(post.content)} min read</span>
        </div>
      </FadeIn>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}

import { getBlogPosts } from 'app/blog/utils'

// TODO: set NEXT_PUBLIC_SITE_URL (or change the fallback) to your real domain.
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sreeharijayaraj.com'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}

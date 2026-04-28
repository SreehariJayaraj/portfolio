import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Sreehari Jayaraj
      </h1>

      <p className="mb-4">
        I’m a frontend-leaning full-stack developer who enjoys building highly
        interactive UIs and smooth animations.
      </p>

      <p className="mb-4">
        I’ve worked across multiple stacks including NestJS and Python, giving
        me a well-rounded understanding of product development.
      </p>

      <p className="mb-4">
        Currently, I’m working as a Founding Engineer at{" "}
        <a
          href="https://credhive.in/?utm_source=sreehari_portfolio&utm_medium=bio&utm_campaign=personal_brand"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          CredHive
        </a>
        , where we’re building credit reports and monitoring solutions for
        Indian companies and MSMEs.
      </p>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
import { experience } from 'app/data/experience'
import { Stagger, StaggerItem } from './motion'

export function Experience() {
  if (experience.length === 0) return null

  return (
    <Stagger className="flex flex-col gap-6">
      {experience.map((job) => {
        const Heading = job.href ? 'a' : 'div'

        return (
          <StaggerItem key={`${job.company}-${job.role}`}>
            <article className="group grid grid-cols-1 gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <p className="pt-0.5 text-sm tabular-nums text-neutral-500 dark:text-neutral-500">
                {job.period}
              </p>

              <div>
                <Heading
                  {...(job.href
                    ? {
                        href: job.href,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                  className="inline-flex items-center gap-1 font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
                >
                  {job.role} ·{' '}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {job.company}
                  </span>
                  {job.href && (
                    <span className="translate-y-px text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                      ↗
                    </span>
                  )}
                </Heading>

                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {job.description}
                </p>

                {job.stack && job.stack.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}

export type Experience = {
  company: string
  role: string
  /** e.g. "2024 — Present". Edit to your real dates. */
  period: string
  description: string
  stack?: string[]
  href?: string
}

/**
 * Your work history, newest first.
 * TODO: confirm the CredHive start/end dates in `period` below.
 */
export const experience: Experience[] = [
  {
    company: 'Headout',
    role: 'Software Engineer · Apps & Web',
    period: 'Jun 2026 — Present',
    description:
      'On the Post-Purchase team — building internal tools for the Ops team and microfrontends for customer-facing platforms, plus mobile apps in React Native.',
    stack: ['React', 'React Native', 'TypeScript', 'Microfrontends'],
    href: 'https://www.headout.com',
  },
  {
    company: 'CredHive',
    role: 'Founding Engineer',
    period: '2024 — 2026', // TODO: confirm exact dates
    description:
      'Built credit reports and monitoring solutions for Indian companies and MSMEs — owning interactive, data-heavy UIs end to end.',
    stack: ['Next.js', 'NestJS', 'Python', 'TypeScript'],
    href: 'https://credhive.in/?utm_source=sreehari_portfolio&utm_medium=experience&utm_campaign=personal_brand',
  },
  {
    company: 'BigBinary',
    role: 'SDET Intern',
    period: 'Feb 2024 — Mar 2024',
    description:
      'QA automation for neetoChat in Playwright + TypeScript — wrote and maintained tests, contributed shared code to the internal npm package, and sped suites up with parallel execution.',
    stack: ['Playwright', 'TypeScript'],
    href: 'https://www.bigbinary.com',
  },
  {
    company: 'NocoDB',
    role: 'Engineering Associate · Intern',
    period: 'Aug 2023 — Oct 2023',
    description:
      'Contributed to NocoDB (37.5k★ open source) — migrated the frontend to a new design system, built a Gmail-style email-badging UI for bulk invites, and added Playwright E2E tests.',
    stack: ['Vue', 'Nuxt', 'Pinia', 'TypeScript', 'Tailwind CSS'],
    href: 'https://nocodb.com',
  },
  {
    company: 'CareStack',
    role: 'SDE Intern',
    period: 'Apr 2023 — May 2023',
    description:
      'Built a developer portal for third-party API docs with JWT email-validated auth, modernized Redoc into a private npm package, and automated Swagger generation from .NET builds via GitLab CI.',
    stack: ['TypeScript', '.NET', 'GitLab CI'],
    href: 'https://carestack.com',
  },
]

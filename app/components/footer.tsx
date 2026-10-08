function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

const links = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/sreeharijayaraj/' },
  { label: 'github', href: 'https://github.com/SreehariJayaraj' },
  {
    label: 'view source',
    href: 'https://github.com/SreehariJayaraj/portfolio',
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 mb-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <ul className="flex flex-col gap-2 text-sm text-neutral-500 sm:flex-row sm:gap-6 dark:text-neutral-500">
        {links.map(({ label, href }) => (
          <li key={href}>
            <a
              className="group flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={href}
            >
              <ArrowIcon />
              {label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-neutral-400 dark:text-neutral-600">
        © {new Date().getFullYear()} Sreehari Jayaraj
      </p>
    </footer>
  )
}

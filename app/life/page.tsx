import { Gallery } from 'app/components/gallery'
import { FadeIn } from 'app/components/motion'
import { getLifePhotos } from './photos'

export const metadata = {
  title: 'Life',
  description: 'Moments from life, outside the code.',
}

export default function Page() {
  const lifePhotos = getLifePhotos()

  return (
    // Break out of the narrow page container for a wider, gallery-style canvas.
    <section className="relative left-1/2 w-screen -translate-x-1/2 px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <FadeIn>
          <h1 className="text-3xl font-semibold tracking-tighter text-neutral-900 sm:text-4xl dark:text-neutral-50">
            Life
          </h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            A few moments from life, outside the code.
          </p>
        </FadeIn>

        <Gallery photos={lifePhotos} />
      </div>
    </section>
  )
}

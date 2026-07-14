import type { FC } from 'react'
import { BackButton } from '@/components/common/back-button'
import { Footer } from '@/components/layout/footer'

const NotFound: FC = () => {
  return (
    <div className="flex flex-1 flex-col justify-between py-8 lg:py-12">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center py-16 sm:py-24">
        <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-600">
          404 Error
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mb-10 max-w-md text-base leading-7 text-neutral-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for or it has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <BackButton href="/" label="Back to home" className="!mb-0" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default NotFound

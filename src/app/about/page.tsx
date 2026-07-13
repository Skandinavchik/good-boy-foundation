import type { FC } from 'react'
import { BackButton } from '@/components/common/back-button'
import { Footer } from '@/components/layout/footer'

const AboutPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between py-8 lg:py-12">
      <main className="mx-auto w-full max-w-4xl flex-1">
        <BackButton />

        <h1 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          About project
        </h1>

        <p className="text-base leading-7 text-neutral-700">
          The Good Boy Foundation is dedicated to improving the lives of dogs across Slovakia.
          We rescue abandoned, abused, and homeless dogs, providing them with medical care,
          shelter, and the love they deserve. Our mission is to give these faithful companions
          a second chance at life by finding them loving homes. In addition to rescue and
          rehabilitation, we also focus on promoting responsible pet ownership and animal welfare
          through educational and community programs.
        </p>

        <div className="my-10 border-y border-neutral-200 py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 text-center">
            <div>
              <div className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
                12 200 €
              </div>
              <div className="mt-2 text-sm font-medium text-neutral-700">
                Total amount raised
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
                1 028
              </div>
              <div className="mt-2 text-sm font-medium text-neutral-700">
                Number of donors
              </div>
            </div>
          </div>
        </div>

        <p className="mb-12 text-base leading-7 text-neutral-700">
          Our work is made possible by the support of passionate volunteers, generous donors, and
          a community that deeply cares about animal welfare. We also organize spay and neuter
          initiatives to address the stray dog problem and ensure long-term impact. At the Good Boy
          Foundation, we believe every dog deserves a safe, loving home and a happy life. Join us
          and help make a difference – whether by volunteering, donating, or adopting a furry
          friend. Together, we can create a better future for dogs across Slovakia.
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage

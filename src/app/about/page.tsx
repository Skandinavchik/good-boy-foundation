import type { FC } from 'react'
import { BackButton } from '@/components/common/back-button'
import { Footer } from '@/components/layout/footer'
import { AboutStats } from '@/components/about/about-stats'

const AboutPage: FC = () => {
  return (
    <div className="flex flex-1 flex-col justify-between py-8 lg:py-12">
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

        <AboutStats />

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

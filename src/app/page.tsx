import type { FC } from 'react'
import { DonationForm } from '@/components/donation/donation-form'
import { Footer } from '@/components/layout/footer'
import { HomeSidebar } from '@/components/layout/home-sidebar'

const HomePage: FC = () => {
  return (
    <div className="flex flex-1 flex-col justify-between gap-8 py-6 lg:flex-row lg:gap-16 lg:py-8">
      <div className="flex flex-1 flex-col justify-between">
        <main className="flex flex-1 flex-col py-4">
          <DonationForm />
        </main>
        <Footer />
      </div>

      <aside className="hidden lg:block lg:w-5/12 xl:w-1/2">
        <HomeSidebar />
      </aside>
    </div>
  )
}

export default HomePage

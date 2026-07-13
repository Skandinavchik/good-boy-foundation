import type { FC } from 'react'
import { Footer } from '@/components/layout/footer'
import { HomeSidebar } from '@/components/layout/home-sidebar'

const HomePage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between gap-8 py-6 lg:flex-row lg:gap-16 lg:py-8">
      {/* Left Column: Separated Content + Footer */}
      <div className="flex flex-1 flex-col justify-between">
        <main className="flex-1 py-4">
          {/* Temporary placeholder per user instruction */}
          <div className="text-lg font-medium text-neutral-800">
            Content
          </div>
        </main>
        <Footer />
      </div>

      {/* Right Column: Dog Image Sidebar taking all screen vertical space */}
      <aside className="hidden lg:block lg:w-5/12 xl:w-1/2">
        <HomeSidebar />
      </aside>
    </div>
  )
}

export default HomePage

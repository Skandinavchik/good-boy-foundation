import type { FC } from 'react'
import { Footer } from '@/components/layout/footer'

const ContactPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between py-8 lg:py-12">
      <main className="flex-1">
        {/* Placeholder per user instruction */}
        <div className="text-lg font-medium text-neutral-800">
          Contact Content
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage

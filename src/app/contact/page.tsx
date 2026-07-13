import type { FC } from 'react'
import Image from 'next/image'
import { BackButton } from '@/components/common/back-button'
import { ContactCard } from '@/components/contact/contact-card'
import { Footer } from '@/components/layout/footer'
import { CONTACT_ITEMS } from '../constants'

const ContactPage: FC = () => {
  return (
    <div className="flex flex-1 flex-col justify-between py-8 lg:py-12">
      <main className="mx-auto w-full max-w-5xl flex-1">
        <BackButton />

        <h1 className="mb-12 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Contact
        </h1>

        <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-3 text-center">
          {CONTACT_ITEMS.map(item => (
            <ContactCard key={item.title} {...item} />
          ))}
        </div>

        <div className="relative mb-12 h-72 w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-sm sm:h-96">
          <Image
            src="/images/contact-dog.png"
            alt="GoodBoy Foundation dog banner"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage

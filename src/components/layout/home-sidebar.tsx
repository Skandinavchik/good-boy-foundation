import type { FC } from 'react'
import Image from 'next/image'

export const HomeSidebar: FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-sm">
      <Image
        src="/images/sidebar-dog.png"
        alt="GoodBoy Foundation - Helping shelter dogs find loving homes"
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 45vw"
      />
    </div>
  )
}

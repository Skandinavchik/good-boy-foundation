import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import type { FC, ReactNode } from 'react'

config.autoAddCss = false

const geistSans = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GoodBoy Foundation | Support Dog Shelters in Slovakia',
  description:
    'Help abandoned and shelter dogs across Slovakia. Support GoodBoy Foundation by donating to specific shelters or general foundation initiatives.',
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout: FC<Readonly<RootLayoutProps>> = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${geistSans.className} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-neutral-900">
        <div className="container mx-auto flex min-h-screen flex-1 flex-col px-8">
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout

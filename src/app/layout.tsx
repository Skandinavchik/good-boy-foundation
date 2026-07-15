import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { QueryProvider } from '@/components/providers/query-provider'
import type { FC, ReactNode } from 'react'

config.autoAddCss = false

const geistSans = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://goodboyfoundation.sk'),
  title: {
    default: 'GoodBoy Foundation | Support Dog Shelters in Slovakia',
    template: '%s | GoodBoy Foundation',
  },
  description:
    'Help abandoned and shelter dogs across Slovakia. Support GoodBoy Foundation by donating to specific shelters or general foundation initiatives.',
  keywords: [
    'dog shelter Slovakia',
    'donate dogs',
    'GoodBoy Foundation',
    'animal rescue Slovakia',
    'charity dogs',
    'support animal shelters',
    'pomoc psom',
    'útulky Slovensko',
  ],
  authors: [{ name: 'GoodBoy Foundation' }],
  creator: 'GoodBoy Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://goodboyfoundation.sk',
    title: 'GoodBoy Foundation | Support Dog Shelters in Slovakia',
    description:
      'Help abandoned and shelter dogs across Slovakia. Support GoodBoy Foundation by donating to specific shelters or general foundation initiatives.',
    siteName: 'GoodBoy Foundation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoodBoy Foundation | Support Dog Shelters in Slovakia',
    description:
      'Help abandoned and shelter dogs across Slovakia. Support GoodBoy Foundation by donating to specific shelters or general foundation initiatives.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <QueryProvider>
          <div className="container flex flex-1 flex-col">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout

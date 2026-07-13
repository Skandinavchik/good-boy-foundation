import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

export const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        {/* Left side: Logo & Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <Image
              src="/Mascot.svg"
              alt="Good boy mascot"
              width={31}
              height={31}
              className="h-7 w-7"
            />
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Good boy
            </span>
          </Link>
        </div>

        {/* Right side: Social links & Navigation Links (Contact, About Project) */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-12">
          <ul className="flex items-center gap-4 text-neutral-400">
            <li>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-neutral-600"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-neutral-600"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </Link>
            </li>
          </ul>

          <nav className="flex items-center gap-4 text-sm font-medium text-neutral-600">
            <Link
              href="/contact"
              className="transition-colors hover:text-neutral-900"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-neutral-900"
            >
              About Project
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

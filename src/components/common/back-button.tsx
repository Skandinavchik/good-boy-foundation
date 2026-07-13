import type { FC } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type BackButtonProps = {
  href?: string
  label?: string
  className?: string
}

export const BackButton: FC<BackButtonProps> = ({
  href = '/',
  label = 'Back',
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`.trim()}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
        <span>{label}</span>
      </Link>
    </div>
  )
}

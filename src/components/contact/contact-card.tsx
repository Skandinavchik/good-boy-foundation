import type { FC } from 'react'
import Link from 'next/link'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type ContactItem = {
  icon: IconDefinition
  title: string
  subtitle: string
  actionLabel: string
  actionHref: string
  isExternal?: boolean
}

export const ContactCard: FC<ContactItem> = ({
  icon,
  title,
  subtitle,
  actionLabel,
  actionHref,
  isExternal = false,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <FontAwesomeIcon icon={icon} className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
      <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      <Link
        href={actionHref}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="mt-4 inline-block text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
      >
        {actionLabel}
      </Link>
    </div>
  )
}

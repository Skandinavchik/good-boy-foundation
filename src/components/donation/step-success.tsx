'use client'

import type { FC } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeart, faArrowRight, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { DonationFormData } from '@/lib/validations/donationSchema'
import { useShelters } from '@/lib/hooks/use-shelters'

export interface StepSuccessProps {
  onDonateAgain: () => void
  successMessage?: string | null
  summary?: DonationFormData | null
}

export const StepSuccess: FC<StepSuccessProps> = ({
  onDonateAgain,
  successMessage,
  summary,
}) => {
  const helpType = summary?.helpType ?? 'foundation'
  const shelterID = summary?.shelterID
  const rawValue = summary?.value ?? 0
  const firstName = summary?.firstName ?? ''
  const lastName = summary?.lastName ?? ''
  const email = summary?.email ?? ''
  const phonePrefix = summary?.phonePrefix ?? '+421'
  const phoneNumber = summary?.phoneNumber ?? ''

  const { data: shelters = [] } = useShelters(
    helpType === 'shelter' || Boolean(shelterID),
  )

  const selectedShelter = shelters.find(s => s.id === Number(shelterID))
  const shelterName = selectedShelter?.name ?? (shelterID ? `Shelter #${shelterID}` : 'Not selected')

  const helpTypeLabel =
    helpType === 'foundation'
      ? 'Contribute to the whole foundation'
      : 'Contribute to a specific shelter'

  const numVal =
    typeof rawValue === 'string'
      ? parseFloat(rawValue.replace(/,/g, '.').trim())
      : rawValue
  const cleanVal = isNaN(numVal) ? 0 : numVal
  const formattedAmount = `${cleanVal.toFixed(2).replace(/\.00$/, '')} €`

  const fullName = `${
    firstName && firstName.trim() ? `${firstName.trim()} ` : ''
  }${lastName.trim()}`.trim()

  const formattedPhone = phoneNumber.trim()
    ? `${phonePrefix} ${phoneNumber.trim()}`
    : 'Not provided'

  return (
    <div className="mx-auto max-w-2xl space-y-10 py-6 text-center sm:py-10">
      {/* Animated Checkmark Badge */}
      <div className="relative mx-auto flex size-24 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50 shadow-sm transition-transform duration-500 animate-in zoom-in-75 sm:size-28">
        <FontAwesomeIcon icon={faCheck} className="size-10 text-green-600 sm:size-12 animate-pulse" />
        <div className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow">
          <FontAwesomeIcon icon={faHeart} className="size-4" />
        </div>
      </div>

      {/* Heading & Message */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Thank you for your generosity! 🎉
        </h1>
        <p className="mx-auto max-w-lg text-base text-neutral-600 sm:text-lg">
          {successMessage ||
            'We have successfully received your donation details. Your support helps provide care and shelter to our furry friends in need.'}
        </p>
      </div>

      {/* Summary Card */}
      <div className="mx-auto rounded-3xl border border-neutral-200 bg-neutral-50/80 p-6 text-left shadow-sm sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
          <h2 className="text-lg font-bold text-neutral-900">Donation Summary</h2>
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Recorded
          </span>
        </div>

        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-neutral-500">Form of help</span>
            <span className="font-semibold text-neutral-900 text-right">{helpTypeLabel}</span>
          </div>

          {helpType === 'shelter' && (
            <div className="flex items-start justify-between gap-4 py-1">
              <span className="text-neutral-500">Shelter</span>
              <span className="font-semibold text-neutral-900 text-right">{shelterName}</span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-neutral-500">Contribution amount</span>
            <span className="font-bold text-indigo-600 text-right text-lg sm:text-xl">{formattedAmount}</span>
          </div>
        </div>

        <Separator className="bg-neutral-200" />

        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-neutral-500">Donor</span>
            <span className="font-semibold text-neutral-900 text-right">
              {fullName || 'Anonymous'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-neutral-500">E-mail</span>
            <span className="font-semibold text-neutral-900 text-right break-all">
              {email || 'Not provided'}
            </span>
          </div>

          {phoneNumber.trim() !== '' && (
            <div className="flex items-start justify-between gap-4 py-1">
              <span className="text-neutral-500">Phone</span>
              <span className="font-semibold text-neutral-900 text-right">
                {formattedPhone}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          type="button"
          onClick={onDonateAgain}
          className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white transition-all hover:bg-indigo-700 shadow-sm"
        >
          <FontAwesomeIcon icon={faRotateRight} className="size-3.5" />
          <span>Donate again</span>
        </Button>

        <Link
          href="/about"
          className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 shadow-2xs"
        >
          <span>See our mission</span>
          <FontAwesomeIcon icon={faArrowRight} className="size-3.5 text-neutral-400" />
        </Link>
      </div>
    </div>
  )
}

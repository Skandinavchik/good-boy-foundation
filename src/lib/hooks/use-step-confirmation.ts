'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { DonationFormData } from '@/lib/validations/donationSchema'
import { useShelters } from '@/lib/hooks/use-shelters'

export const useStepConfirmation = () => {
  const { control } = useFormContext<DonationFormData>()
  const values = useWatch({ control })

  const helpType = values.helpType ?? 'foundation'
  const shelterID = values.shelterID
  const rawValue = values.value ?? 0
  const firstName = values.firstName
  const lastName = values.lastName ?? ''
  const email = values.email ?? ''
  const phonePrefix = values.phonePrefix ?? '+421'
  const phoneNumber = values.phoneNumber ?? ''

  const { data: shelters = [], isPending: isSheltersPending } = useShelters(
    helpType === 'shelter' || Boolean(shelterID),
  )

  const helpTypeLabel =
    helpType === 'foundation'
      ? 'Contribute to the whole foundation'
      : 'Contribute to a specific shelter'

  const selectedShelter = shelters.find(s => s.id === Number(shelterID))
  const shelterName = selectedShelter?.name ?? (isSheltersPending ? 'Loading shelter...' : 'Not selected')

  const numVal =
    typeof rawValue === 'string'
      ? parseFloat(rawValue.replace(/,/g, '.').trim())
      : rawValue
  const cleanVal = isNaN(numVal) ? 0 : numVal
  const formattedAmount = `${cleanVal.toFixed(2).replace(/\.00$/, '')} €`

  const fullName = `${
    firstName && firstName.trim() ? `${firstName.trim()} ` : ''
  }${lastName.trim()}`.trim()

  const formattedPhone = `${phonePrefix} ${phoneNumber.trim()}`.trim()

  return {
    control,
    helpType,
    helpTypeLabel,
    shelterName,
    formattedAmount,
    fullName,
    email: email.trim(),
    formattedPhone,
  }
}

'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { DonationFormData } from '@/lib/validations/donationSchema'
import { useShelters } from '@/lib/hooks/use-shelters'

export const useStepShelterSelection = () => {
  const { control, setValue } = useFormContext<DonationFormData>()
  const helpType = useWatch({ control, name: 'helpType' })

  const {
    data: shelters = [],
    isPending,
    isError,
  } = useShelters(helpType === 'shelter')

  const onHelpTypeChange = (
    val: string[] | string,
    onChange: (val: string) => void,
  ) => {
    const selected = Array.isArray(val) ? val[0] : val
    if (selected) {
      onChange(selected)
      if (selected === 'foundation') {
        setValue('shelterId', undefined)
      }
    }
  }

  const getSelectPlaceholder = () => {
    if (helpType !== 'shelter') return 'Select shelter from the list'
    if (isPending) return 'Loading shelters...'
    if (isError) return 'Error loading shelters'
    return 'Select shelter from the list'
  }

  const shelterOptions = shelters.map(s => ({ value: s.id, label: s.name }))
  const presetValues = [5, 10, 20, 30, 50, 100]

  const onPresetChange = (
    val: string[] | string,
    onChange: (val: number) => void,
  ) => {
    const selected = Array.isArray(val) ? val[0] : val
    if (selected) {
      const parsed = parseInt(selected, 10)
      if (!isNaN(parsed)) onChange(parsed)
    }
  }

  const onCustomInputChange = (
    rawValue: string,
    onChange: (val: number) => void,
  ) => {
    const cleaned = rawValue.replace(/\D/g, '')
    const parsed = cleaned ? parseInt(cleaned, 10) : 0
    onChange(parsed)
  }

  return {
    control,
    helpType,
    isPending,
    isError,
    shelters,
    shelterOptions,
    presetValues,
    onHelpTypeChange,
    getSelectPlaceholder,
    onPresetChange,
    onCustomInputChange,
  }
}

'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { DonationFormData } from '@/lib/validations/donationSchema'
import { useShelters } from '@/lib/hooks/use-shelters'

export const useStepShelterSelection = () => {
  const {
    control,
    setValue,
    clearErrors,
  } = useFormContext<DonationFormData>()
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
        setValue('helpType', 'foundation')
        setValue('shelterID', undefined)
        clearErrors('shelterID')
      } else {
        setValue('helpType', 'shelter')
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

  const onShelterChange = (
    val: string | null | undefined,
    onChange: (val: number | undefined) => void,
  ) => {
    const parsed = val ? parseInt(val, 10) : undefined
    const cleanNum = parsed && !isNaN(parsed) ? parsed : undefined
    onChange(cleanNum)
  }

  const onPresetChange = (
    val: string[] | string,
    onChange: (val: number) => void,
  ) => {
    const selected = Array.isArray(val) ? val[0] : val
    if (selected) {
      const parsed = parseFloat(selected)
      if (!isNaN(parsed)) {
        onChange(parsed)
      }
    }
  }

  const onCustomInputChange = (
    rawValue: string,
    onChange: (val: string | number) => void,
  ) => {
    let cleaned = rawValue.replace(/,/g, '.').replace(/[^0-9.]/g, '')
    const parts = cleaned.split('.')
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('')
    }
    const cleanParts = cleaned.split('.')
    if (cleanParts.length === 2 && cleanParts[1].length > 2) {
      cleaned = cleanParts[0] + '.' + cleanParts[1].slice(0, 2)
    }
    onChange(cleaned)
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
    onShelterChange,
    onPresetChange,
    onCustomInputChange,
  }
}

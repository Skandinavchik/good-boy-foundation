'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { DonationFormData } from '@/lib/validations/donationSchema'

export interface PhonePrefixOption {
  value: '+421' | '+420'
  label: string
  flag: string
}

export const useStepPersonalDetails = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<DonationFormData>()

  const phonePrefix = useWatch({ control, name: 'phonePrefix' })

  const prefixOptions: PhonePrefixOption[] = [
    { value: '+421', label: '🇸🇰 +421', flag: '🇸🇰' },
    { value: '+420', label: '🇨🇿 +420', flag: '🇨🇿' },
  ]

  const onFirstNameChange = (
    val: string,
    onChange: (val: string) => void,
  ) => {
    onChange(val)
  }

  const onLastNameChange = (
    val: string,
    onChange: (val: string) => void,
  ) => {
    onChange(val)
  }

  const onEmailChange = (
    val: string,
    onChange: (val: string) => void,
  ) => {
    onChange(val)
  }

  const onPhonePrefixChange = (
    val: string | null | undefined,
    onChange: (val: string) => void,
  ) => {
    if (val === '+421' || val === '+420') {
      onChange(val)
    }
  }

  const onPhoneNumberChange = (
    rawValue: string,
    onChange: (val: string) => void,
  ) => {
    const digits = rawValue.replace(/\D/g, '')
    let formatted = digits
    if (digits.length > 3 && digits.length <= 6) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3)}`
    } else if (digits.length > 6 && digits.length <= 9) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    } else if (digits.length > 9) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
    }
    onChange(formatted)
  }

  return {
    control,
    errors,
    phonePrefix,
    prefixOptions,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPhonePrefixChange,
    onPhoneNumberChange,
  }
}

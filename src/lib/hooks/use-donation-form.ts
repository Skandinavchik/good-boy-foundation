'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  donationFormSchema,
  toApiPayload,
  type DonationFormData,
} from '@/lib/validations/donationSchema'

export const useDonationForm = (itemsLength: number) => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const methods = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      helpType: 'foundation',
      shelterID: undefined,
      value: 50,
      firstName: '',
      lastName: '',
      email: '',
      phonePrefix: '+421',
      phoneNumber: '',
      consentAgreed: false,
    },
  })

  const onSubmit: SubmitHandler<DonationFormData> = data => {
    const payload = toApiPayload(data)
    console.info('Form submitted (API Payload):', payload)
  }

  const isLastStep = currentStep === itemsLength - 1

  const handleNext = async () => {
    if (currentStep === 0) {
      const isValid = await methods.trigger(['helpType', 'shelterID', 'value'])
      if (!isValid) return
    } else if (currentStep === 1) {
      const isValid = await methods.trigger([
        'firstName',
        'lastName',
        'email',
        'phonePrefix',
        'phoneNumber',
      ])
      if (!isValid) return
    }
    if (currentStep < itemsLength - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepChange = async (targetStep: number) => {
    if (targetStep > currentStep) {
      if (currentStep === 0) {
        const isValid = await methods.trigger([
          'helpType',
          'shelterID',
          'value',
        ])
        if (!isValid) return
      }
      if (currentStep <= 1 && targetStep > 1) {
        const isValidStep1 = await methods.trigger([
          'firstName',
          'lastName',
          'email',
          'phonePrefix',
          'phoneNumber',
        ])
        if (!isValidStep1) return
      }
    }
    setCurrentStep(targetStep)
  }

  return {
    methods,
    currentStep,
    setCurrentStep,
    isLastStep,
    handleNext,
    handleBack,
    handleStepChange,
    onSubmit,
  }
}

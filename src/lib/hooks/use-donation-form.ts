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
  const [attemptedSteps, setAttemptedSteps] = useState<Record<number, boolean>>({})

  const methods = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    mode: 'onChange',
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

  const step1Fields: (keyof DonationFormData)[] = ['helpType', 'shelterID', 'value']
  const step2Fields: (keyof DonationFormData)[] = [
    'firstName',
    'lastName',
    'email',
    'phonePrefix',
    'phoneNumber',
  ]

  const handleNext = async () => {
    setAttemptedSteps(prev => ({ ...prev, [currentStep]: true }))
    if (currentStep === 0) {
      const isValid = await methods.trigger(step1Fields)
      if (!isValid) return
    } else if (currentStep === 1) {
      const isValid = await methods.trigger(step2Fields)
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
        setAttemptedSteps(prev => ({ ...prev, 0: true }))
        const isValid = await methods.trigger(step1Fields)
        if (!isValid) return
      }
      if (currentStep <= 1 && targetStep > 1) {
        setAttemptedSteps(prev => ({ ...prev, 0: true, 1: true }))
        const isValidStep1 = await methods.trigger(step2Fields)
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
    attemptedSteps,
    handleNext,
    handleBack,
    handleStepChange,
    onSubmit,
  }
}

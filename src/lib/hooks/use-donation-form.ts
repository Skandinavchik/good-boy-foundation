'use client'

import { useEffect } from 'react'
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  donationFormSchema,
  toApiPayload,
  type DonationFormData,
} from '@/lib/validations/donationSchema'
import {
  useDonationStore,
  initialDraftFormData,
} from '@/lib/stores/use-donation-store'

export const useDonationForm = (itemsLength: number) => {
  const currentStep = useDonationStore(state => state.currentStep)
  const attemptedSteps = useDonationStore(state => state.attemptedSteps)
  const draftFormData = useDonationStore(state => state.draftFormData)
  const isSubmitting = useDonationStore(state => state.isSubmitting)
  const isSubmittedSuccess = useDonationStore(
    state => state.isSubmittedSuccess,
  )
  const setCurrentStep = useDonationStore(state => state.setCurrentStep)
  const setAttemptedStep = useDonationStore(state => state.setAttemptedStep)
  const updateDraftFormData = useDonationStore(
    state => state.updateDraftFormData,
  )
  const setIsSubmitting = useDonationStore(state => state.setIsSubmitting)
  const setIsSubmittedSuccess = useDonationStore(
    state => state.setIsSubmittedSuccess,
  )
  const resetStore = useDonationStore(state => state.resetStore)

  const methods = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: draftFormData as DonationFormData,
  })

  const watchedValues = useWatch({ control: methods.control })

  useEffect(() => {
    if (watchedValues) {
      updateDraftFormData(watchedValues as Partial<DonationFormData>)
    }
  }, [watchedValues, updateDraftFormData])

  const onSubmit: SubmitHandler<DonationFormData> = async data => {
    setIsSubmitting(true)
    try {
      const payload = toApiPayload(data)
      console.info('Form submitted (API Payload):', payload)
      setIsSubmittedSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLastStep = currentStep === itemsLength - 1

  const step1Fields: (keyof DonationFormData)[] = [
    'helpType',
    'shelterID',
    'value',
  ]
  const step2Fields: (keyof DonationFormData)[] = [
    'firstName',
    'lastName',
    'email',
    'phonePrefix',
    'phoneNumber',
  ]

  const handleNext = async () => {
    setAttemptedStep(currentStep, true)
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
        setAttemptedStep(0, true)
        const isValid = await methods.trigger(step1Fields)
        if (!isValid) return
      }
      if (currentStep <= 1 && targetStep > 1) {
        setAttemptedStep(0, true)
        setAttemptedStep(1, true)
        const isValidStep1 = await methods.trigger(step2Fields)
        if (!isValidStep1) return
      }
    }
    setCurrentStep(targetStep)
  }

  const resetForm = () => {
    resetStore()
    methods.reset(initialDraftFormData as DonationFormData)
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
    isSubmitting,
    isSubmittedSuccess,
    resetStore,
    resetForm,
  }
}

'use client'

import type { FC } from 'react'
import { FormProvider } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Stepper, type StepItem } from '@/components/common/stepper'
import { StepShelterSelection } from './step-shelter-selection'
import { StepPersonalDetails } from './step-personal-details'
import { StepConfirmation } from './step-confirmation'
import { useDonationForm } from '@/lib/hooks/use-donation-form'

export const DonationForm: FC = () => {
  const {
    methods,
    currentStep,
    isLastStep,
    attemptedSteps,
    handleNext,
    handleBack,
    handleStepChange,
    onSubmit,
    isSubmitting,
    isSubmittedSuccess,
    resetForm,
  } = useDonationForm(3)

  const items: StepItem[] = [
    {
      title: 'Choose shelter',
      content: <StepShelterSelection stepAttempted={Boolean(attemptedSteps[0])} />,
    },
    {
      title: 'Personal details',
      content: <StepPersonalDetails stepAttempted={Boolean(attemptedSteps[1])} />,
    },
    {
      title: 'Confirmation',
      content: <StepConfirmation stepAttempted={Boolean(attemptedSteps[2])} />,
    },
  ]

  if (isSubmittedSuccess) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center space-y-6 py-12 text-center sm:py-16">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg
            className="size-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Thank you for your support!
          </h1>
          <p className="max-w-md text-base text-neutral-600">
            We have successfully received your donation details. Your help
            makes a wonderful difference for shelter dogs.
          </p>
        </div>
        <div className="pt-4">
          <Button
            type="button"
            onClick={resetForm}
            className="inline-flex h-12 items-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Start new donation
          </Button>
        </div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-between gap-12"
      >
        <Stepper
          items={items}
          current={currentStep}
          onStepChange={step => {
            void handleStepChange(step)
          }}
        />

        <div className="flex items-center justify-between pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-neutral-100 px-6 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={
              isLastStep
                ? methods.handleSubmit(onSubmit)
                : () => {
                  void handleNext()
                }
            }
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
          >
            <span>
              {isSubmitting
                ? 'Submitting...'
                : isLastStep
                  ? 'Submit form'
                  : 'Continue'}
            </span>
            {!isLastStep && !isSubmitting && (
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

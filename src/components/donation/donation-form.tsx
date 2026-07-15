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
    errorMessage,
    successMessage,
    setSuccessMessage,
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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-between gap-12"
      >
        <div className="space-y-6">
          {successMessage && (
            <div className="flex items-start justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 size-5 shrink-0 text-green-600"
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
                <div>
                  <p className="font-semibold text-green-900">Success</p>
                  <p className="mt-0.5 text-green-700">{successMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSuccessMessage?.(null)}
                className="rounded-lg p-1 text-green-600 transition-colors hover:bg-green-100 hover:text-green-800"
                aria-label="Close"
              >
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <Stepper
            items={items}
            current={currentStep}
            onStepChange={step => {
              void handleStepChange(step)
            }}
          />
        </div>

        <div className="space-y-4 pt-6">
          {errorMessage && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <svg
                className="mt-0.5 size-5 shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-semibold text-red-900">Submission Error</p>
                <p className="mt-0.5 text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
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
              className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting && (
                <svg
                  className="size-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
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
        </div>
      </form>
    </FormProvider>
  )
}

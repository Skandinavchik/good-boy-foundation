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
            disabled={currentStep === 0}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-neutral-100 px-6 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>

          <Button
            type="button"
            onClick={
              isLastStep
                ? methods.handleSubmit(onSubmit)
                : () => {
                  void handleNext()
                }
            }
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
          >
            <span>{isLastStep ? 'Submit form' : 'Continue'}</span>
            {!isLastStep && (
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

'use client'

import { useState, type FC } from 'react'
import {
  useForm,
  FormProvider,
  type SubmitHandler,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Stepper, type StepItem } from '@/components/ui/stepper'
import {
  donationFormSchema,
  type DonationFormData,
} from '@/lib/validations/donationSchema'
import { StepShelterSelection } from './step-shelter-selection'

export const DonationForm: FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const methods = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      helpType: 'foundation',
      shelterId: undefined,
      amount: 50,
      firstName: '',
      lastName: '',
      email: '',
      phonePrefix: '+421',
      phoneNumber: '',
      consentAgreed: false,
    },
  })

  const onSubmit: SubmitHandler<DonationFormData> = data => {
    console.log('Form submitted:', data)
  }

  const items: StepItem[] = [
    {
      title: 'Choose shelter',
      content: (
        <StepShelterSelection />
      ),
    },
    {
      title: 'Personal details',
      content: (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            We need a few details from you
          </h1>
          <p className="text-base text-neutral-600">
            Placeholder for personal details form fields.
          </p>
        </div>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Check your details
          </h1>
          <p className="text-base text-neutral-600">
            Placeholder for donation summary and confirmation.
          </p>
        </div>
      ),
    },
  ]

  const isLastStep = currentStep === items.length - 1

  const handleNext = () => {
    if (currentStep < items.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
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
          onStepChange={setCurrentStep}
        />

        <div className="flex items-center justify-between pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-6 py-5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>

          <Button
            type="button"
            onClick={isLastStep ? methods.handleSubmit(onSubmit) : handleNext}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
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

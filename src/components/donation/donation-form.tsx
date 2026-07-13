'use client'

import { useState, type FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Stepper, type StepItem } from '@/components/ui/stepper'

export const DonationForm: FC = () => {
  const [current, setCurrent] = useState<number>(0)

  const items: StepItem[] = [
    {
      title: 'Choose shelter',
      content: (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Choose how you want to help
          </h1>
          <p className="text-base text-neutral-600">
            Placeholder for shelter selection and donation amount choices.
          </p>
        </div>
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

  const handleNext = () => {
    if (current < items.length - 1) setCurrent(current + 1)
  }

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1)
  }

  return (
    <div className="flex flex-1 flex-col justify-between gap-12">
      <Stepper items={items} current={current} onStepClick={setCurrent} />

      <div className="flex items-center justify-between pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBack}
          disabled={current === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-6 py-5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
          <span>Back</span>
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={current === items.length - 1}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
        >
          <span>
            {current === items.length - 1 ? 'Submit form' : 'Continue'}
          </span>
          {current < items.length - 1 && (
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  )
}

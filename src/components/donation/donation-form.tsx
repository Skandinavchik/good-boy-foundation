import type { FC } from 'react'
import { Stepper, type StepItem } from '@/components/ui/stepper'

export const DonationForm: FC = () => {
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

  return (
    <div className="flex flex-1 flex-col justify-between">
      <Stepper items={items} />
    </div>
  )
}

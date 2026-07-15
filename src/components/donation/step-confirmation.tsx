'use client'

import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStepConfirmation } from '@/lib/hooks/use-step-confirmation'

export interface StepConfirmationProps {
  stepAttempted?: boolean
}

export const StepConfirmation: FC<StepConfirmationProps> = ({
  stepAttempted = false,
}) => {
  const {
    control,
    helpType,
    helpTypeLabel,
    shelterName,
    formattedAmount,
    fullName,
    email,
    formattedPhone,
  } = useStepConfirmation()

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Check your entered details
        </h1>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-xl font-bold text-neutral-900">Summary</h2>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-sm text-neutral-600 sm:text-base">
              Form of help
            </span>
            <span className="text-right text-sm font-semibold text-neutral-900 sm:text-base">
              {helpTypeLabel}
            </span>
          </div>

          {helpType === 'shelter' && (
            <div className="flex items-start justify-between gap-4 py-1">
              <span className="text-sm text-neutral-600 sm:text-base">
                Shelter
              </span>
              <span className="text-right text-sm font-semibold text-neutral-900 sm:text-base">
                {shelterName}
              </span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-sm text-neutral-600 sm:text-base">
              Donation amount
            </span>
            <span className="text-right text-sm font-semibold text-neutral-900 sm:text-base">
              {formattedAmount}
            </span>
          </div>
        </div>

        <Separator className="my-6 bg-neutral-200 sm:my-8" />

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-sm text-neutral-600 sm:text-base">
              Full name
            </span>
            <span className="text-right text-sm font-semibold text-neutral-900 sm:text-base">
              {fullName || 'Not provided'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-sm text-neutral-600 sm:text-base">
              E-mail
            </span>
            <span className="text-right text-sm font-semibold text-neutral-900 sm:text-base">
              {email}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-sm text-neutral-600 sm:text-base">
              Phone number
            </span>
            <span className="text-right text-sm font-semibold text-neutral-900 sm:text-base">
              {formattedPhone}
            </span>
          </div>
        </div>

        <Separator className="my-6 bg-neutral-200 sm:my-8" />

        <div className="pt-2">
          <Controller
            name="consentAgreed"
            control={control}
            render={({ field, fieldState, formState }) => {
              const showError =
                Boolean(fieldState.error) &&
                (fieldState.isTouched ||
                  fieldState.isDirty ||
                  stepAttempted ||
                  formState.isSubmitted)
              const errorId = 'consentAgreed-error'

              return (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="consentAgreed"
                      checked={Boolean(field.value)}
                      onCheckedChange={checked => {
                        field.onChange(Boolean(checked))
                      }}
                      aria-invalid={showError ? true : undefined}
                      aria-describedby={showError && fieldState.error ? errorId : undefined}
                      className="size-5 rounded border-neutral-300 data-checked:border-indigo-600 data-checked:bg-indigo-600 focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50"
                    />
                    <Label
                      htmlFor="consentAgreed"
                      className="cursor-pointer text-sm font-normal text-neutral-900 sm:text-base"
                    >
                      I agree with the processing of my personal data
                    </Label>
                  </div>

                  {showError && fieldState.error && (
                    <p id={errorId} className="text-sm font-medium text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import type { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { DonationFormData } from '@/lib/validations/donationSchema'

export const StepShelterSelection: FC = () => {
  const { control } = useFormContext<DonationFormData>()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Choose how you want to help
        </h1>
      </div>

      <Controller
        name="helpType"
        control={control}
        render={({ field }) => (
          <ToggleGroup
            value={[field.value]}
            onValueChange={(val: string[] | string) => {
              const selected = Array.isArray(val) ? val[0] : val
              if (selected) {
                field.onChange(selected)
              }
            }}
            variant="outline"
            className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2"
          >
            <ToggleGroupItem value="foundation" className="w-full">
              Contribute to the whole foundation
            </ToggleGroupItem>

            <ToggleGroupItem value="shelter" className="w-full">
              Contribute to a specific shelter
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      />
    </div>
  )
}

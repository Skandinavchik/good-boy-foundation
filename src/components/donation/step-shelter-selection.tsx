'use client'

import type { FC } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { DonationFormData } from '@/lib/validations/donationSchema'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useShelters } from '@/lib/hooks/use-shelters'

export const StepShelterSelection: FC = () => {
  const { control, setValue } = useFormContext<DonationFormData>()
  const helpType = useWatch({ control, name: 'helpType' })

  const {
    data: shelters = [],
    isPending,
    isError,
  } = useShelters(helpType === 'shelter')

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
                if (selected === 'foundation') {
                  setValue('shelterId', undefined)
                }
              }
            }}
            variant="outline"
            className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2"
          >
            <ToggleGroupItem value="foundation" className="h-8 w-full">
              Contribute to the whole foundation
            </ToggleGroupItem>

            <ToggleGroupItem value="shelter" className="h-8 w-full">
              Contribute to a specific shelter
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      />

      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-neutral-900">About project</h2>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-900">
            Shelter{' '}
            <span className="font-normal text-neutral-400">
              ({helpType === 'shelter' ? 'Required' : 'Optional'})
            </span>
          </label>

          <Controller
            name="shelterId"
            control={control}
            render={({ field }) => (
              <Select
                items={shelters.map(s => ({ value: s.id, label: s.name }))}
                value={field.value ?? null}
                onValueChange={field.onChange}
                disabled={helpType !== 'shelter' || isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      helpType !== 'shelter'
                        ? 'Select shelter from the list'
                        : isPending
                          ? 'Loading shelters...'
                          : isError
                            ? 'Error loading shelters'
                            : 'Select shelter from the list'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {shelters.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  )
}

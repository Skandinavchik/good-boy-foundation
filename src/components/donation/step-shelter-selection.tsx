'use client'

import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useStepShelterSelection } from '@/lib/hooks/use-step-shelter-selection'

export const StepShelterSelection: FC = () => {
  const {
    control,
    helpType,
    isPending,
    shelters,
    presetValues,
    onHelpTypeChange,
    getSelectPlaceholder,
    onShelterChange,
    onPresetChange,
    onCustomInputChange,
  } = useStepShelterSelection()

  return (
    <div className="space-y-16 sm:space-y-20">
      <div className="space-y-6 sm:space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Choose how you want to help
        </h1>

        <Controller
          name="helpType"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              value={[field.value]}
              onValueChange={(val: string[] | string) =>
                onHelpTypeChange(val, field.onChange)
              }
              variant="outline"
              className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
            >
              <ToggleGroupItem value="foundation" className="h-14 w-full">
                Contribute to the whole foundation
              </ToggleGroupItem>

              <ToggleGroupItem value="shelter" className="h-14 w-full">
                Contribute to a specific shelter
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        />
      </div>

      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-xl font-bold text-neutral-900">About project</h2>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-neutral-900">
            Shelter{' '}
            <span className="font-normal text-neutral-400">
              ({helpType === 'shelter' ? 'Required' : 'Optional'})
            </span>
          </label>

          <Controller
            name="shelterID"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <Select
                  items={shelters.map(s => ({
                    value: s.id.toString(),
                    label: s.name,
                  }))}
                  value={
                    field.value !== undefined && field.value !== null
                      ? field.value.toString()
                      : null
                  }
                  onValueChange={val =>
                    onShelterChange(val, field.onChange)
                  }
                  disabled={helpType !== 'shelter' || isPending}
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      fieldState.error && 'border-red-500 focus:ring-red-500',
                    )}
                  >
                    <SelectValue placeholder={getSelectPlaceholder()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {shelters.map(({ id, name }) => (
                        <SelectItem key={id} value={id.toString()}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-sm font-medium text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="space-y-8 sm:space-y-10">
        <h2 className="text-xl font-bold text-neutral-900">
          Amount you want to contribute
        </h2>

        <Controller
          name="value"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-10">
              <div className="flex flex-col items-center justify-center pt-4 pb-6">
                <div
                  className={cn(
                    'relative inline-flex items-baseline justify-center border-b-2 pb-3 px-6 min-w-40',
                    fieldState.error ? 'border-red-500' : 'border-indigo-600',
                  )}
                >
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9.,]*"
                    placeholder="0"
                    value={
                      field.value !== undefined && field.value !== null && field.value > 0
                        ? field.value.toString()
                        : ''
                    }
                    onChange={e =>
                      onCustomInputChange(e.target.value, field.onChange)
                    }
                    className="w-28 sm:w-36 bg-transparent text-center text-5xl sm:text-6xl font-bold tracking-tight text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                  <span className="ml-1 text-2xl sm:text-3xl font-bold text-neutral-900">
                    €
                  </span>
                </div>
                {fieldState.error && (
                  <p className="text-sm font-medium text-red-500 pt-3 text-center">
                    {fieldState.error.message}
                  </p>
                )}
              </div>

              <ToggleGroup
                value={[field.value?.toString() ?? '']}
                onValueChange={(val: string[] | string) =>
                  onPresetChange(val, field.onChange)
                }
                variant="outline"
                className="grid w-full grid-cols-3 gap-4 sm:grid-cols-6"
              >
                {presetValues.map(item => (
                  <ToggleGroupItem
                    key={item}
                    value={item.toString()}
                    className="h-14 w-full rounded-2xl border-0 bg-neutral-100 text-base font-bold text-neutral-700 transition-all hover:bg-neutral-200 data-pressed:bg-indigo-600 data-pressed:text-white data-pressed:shadow-sm"
                  >
                    {item} €
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}
        />
      </div>
    </div>
  )
}

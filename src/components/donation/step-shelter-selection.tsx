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
    onPresetChange,
    onCustomInputChange,
  } = useStepShelterSelection()

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
            onValueChange={(val: string[] | string) =>
              onHelpTypeChange(val, field.onChange)
            }
            variant="outline"
            className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2"
          >
            <ToggleGroupItem value="foundation" className="h-12 w-full">
              Contribute to the whole foundation
            </ToggleGroupItem>

            <ToggleGroupItem value="shelter" className="h-12 w-full">
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
                  <SelectValue placeholder={getSelectPlaceholder()} />
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

      <div className="space-y-6 pt-2">
        <h2 className="text-lg font-bold text-neutral-900">
          Amount you want to contribute
        </h2>

        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center pt-2 pb-4">
                <div className="relative inline-flex items-baseline justify-center border-b-2 border-indigo-600 pb-2 px-4 min-w-[140px]">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="0"
                    value={
                      field.value && field.value > 0
                        ? field.value.toString()
                        : ''
                    }
                    onChange={e =>
                      onCustomInputChange(e.target.value, field.onChange)
                    }
                    className="w-24 sm:w-32 bg-transparent text-center text-5xl sm:text-6xl font-bold tracking-tight text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                  <span className="ml-1 text-2xl sm:text-3xl font-bold text-neutral-900">
                    €
                  </span>
                </div>
              </div>

              <ToggleGroup
                value={[field.value?.toString() ?? '']}
                onValueChange={(val: string[] | string) =>
                  onPresetChange(val, field.onChange)
                }
                variant="outline"
                className="grid w-full grid-cols-3 gap-3 sm:grid-cols-6"
              >
                {presetValues.map(item => (
                  <ToggleGroupItem
                    key={item}
                    value={item.toString()}
                    className="h-12 w-full rounded-2xl border-0 bg-neutral-100 text-base font-bold text-neutral-700 transition-all hover:bg-neutral-200 data-[pressed]:bg-indigo-600 data-[pressed]:text-white data-[pressed]:shadow-sm"
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

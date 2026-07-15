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

export interface StepShelterSelectionProps {
  stepAttempted?: boolean
}

export const StepShelterSelection: FC<StepShelterSelectionProps> = ({
  stepAttempted = false,
}) => {
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
          render={({ field }) => {
            const toggleItemClass =
              'h-14 w-full font-semibold transition-all data-[state=on]:bg-indigo-600 data-[state=on]:text-white data-[state=on]:border-indigo-600 data-[state=on]:hover:bg-indigo-700 data-[state=on]:hover:text-white aria-pressed:bg-indigo-600 aria-pressed:text-white aria-pressed:border-indigo-600 aria-pressed:hover:bg-indigo-700 aria-pressed:hover:text-white data-[pressed]:bg-indigo-600 data-[pressed]:text-white data-[pressed]:border-indigo-600 data-[pressed]:hover:bg-indigo-700 data-[pressed]:hover:text-white'

            return (
              <ToggleGroup
                value={[field.value]}
                onValueChange={(val: string[] | string) =>
                  onHelpTypeChange(val, field.onChange)
                }
                variant="outline"
                className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
              >
                <ToggleGroupItem value="foundation" className={toggleItemClass}>
                  Contribute to the whole foundation
                </ToggleGroupItem>

                <ToggleGroupItem value="shelter" className={toggleItemClass}>
                  Contribute to a specific shelter
                </ToggleGroupItem>
              </ToggleGroup>
            )
          }}
        />
      </div>

      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-xl font-bold text-neutral-900">About project</h2>

        <div className="space-y-1.5">
          <Controller
            name="shelterID"
            control={control}
            render={({ field, fieldState, formState }) => {
              const showError =
                Boolean(fieldState.error) &&
                (fieldState.isTouched ||
                  fieldState.isDirty ||
                  stepAttempted ||
                  formState.isSubmitted)
              const errorId = 'shelterID-error'
              return (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="shelterID" className="block text-sm font-semibold text-neutral-900">
                      Shelter{' '}
                      <span className="font-normal text-neutral-400">
                        ({helpType === 'shelter' ? 'Required' : 'Optional'})
                      </span>
                    </label>
                    {field.value !== undefined && field.value !== null && (
                      <button
                        type="button"
                        onClick={() => field.onChange(undefined)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Clear selection
                      </button>
                    )}
                  </div>
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
                    disabled={isPending}
                  >
                    <SelectTrigger
                      id="shelterID"
                      aria-invalid={showError}
                      aria-describedby={showError && fieldState.error ? errorId : undefined}
                      className={cn(
                        'w-full',
                        showError && 'border-red-500 focus:ring-red-500',
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

      <div className="space-y-8 sm:space-y-10">
        <h2 id="amount-heading" className="text-xl font-bold text-neutral-900">
          Amount you want to contribute
        </h2>

        <Controller
          name="value"
          control={control}
          render={({ field, fieldState, formState }) => {
            const showError =
              Boolean(fieldState.error) &&
              (fieldState.isTouched ||
                fieldState.isDirty ||
                stepAttempted ||
                formState.isSubmitted)
            const errorId = 'value-error'

            const valStr =
              field.value !== undefined && field.value !== null
                ? field.value.toString()
                : ''
            const charLength = Math.max(valStr.length, 1)
            const fontSizeClass =
              charLength > 6
                ? 'text-3xl sm:text-4xl'
                : charLength > 4
                  ? 'text-4xl sm:text-5xl'
                  : 'text-5xl sm:text-6xl'

            return (
              <div className="space-y-10">
                <div className="flex flex-col items-center justify-center pt-4 pb-6">
                  <div
                    className={cn(
                      'relative inline-flex items-baseline justify-center border-b-2 pb-3 px-6 min-w-40 max-w-full overflow-hidden transition-colors',
                      showError ? 'border-red-500' : 'border-indigo-600',
                    )}
                  >
                    <input
                      id="value"
                      type="text"
                      inputMode="decimal"
                      pattern="[0-9.,]*"
                      placeholder="0"
                      aria-labelledby="amount-heading"
                      aria-invalid={showError}
                      aria-describedby={showError && fieldState.error ? errorId : undefined}
                      value={valStr}
                      onChange={e =>
                        onCustomInputChange(e.target.value, field.onChange)
                      }
                      style={{ width: `${Math.max(charLength * 0.75, 2)}ch` }}
                      className={cn(
                        'bg-transparent text-center font-bold tracking-tight text-neutral-900 outline-none placeholder:text-neutral-400 max-w-full transition-all',
                        fontSizeClass,
                      )}
                    />
                    <span className="ml-1 text-2xl sm:text-3xl font-bold text-neutral-900">
                      €
                    </span>
                  </div>
                  {showError && fieldState.error && (
                    <p id={errorId} className="text-sm font-medium text-red-500 pt-3 text-center">
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
            )
          }}
        />
      </div>
    </div>
  )
}

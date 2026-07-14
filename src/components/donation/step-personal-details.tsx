'use client'

import type { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStepPersonalDetails } from '@/lib/hooks/use-step-personal-details'

export const StepPersonalDetails: FC = () => {
  const {
    control,
    prefixOptions,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPhonePrefixChange,
    onPhoneNumberChange,
  } = useStepPersonalDetails()

  return (
    <div className="space-y-16 sm:space-y-20">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          We need some information from you
        </h1>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-xl font-bold text-neutral-900">About you</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* First Name (Optional) */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-neutral-900">
              First name{' '}
              <span className="font-normal text-neutral-400">(Optional)</span>
            </Label>

            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Input
                    value={field.value || ''}
                    onChange={e =>
                      onFirstNameChange(e.target.value, field.onChange)
                    }
                    placeholder="Enter your first name"
                    aria-invalid={Boolean(fieldState.error)}
                    className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50"
                  />
                  {fieldState.error && (
                    <p className="text-sm font-medium text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Last Name (Required) */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-neutral-900">
              Last name
            </Label>

            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Input
                    value={field.value || ''}
                    onChange={e =>
                      onLastNameChange(e.target.value, field.onChange)
                    }
                    placeholder="Enter your last name"
                    aria-invalid={Boolean(fieldState.error)}
                    className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50"
                  />
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

        {/* E-mail Address */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-neutral-900">
            E-mail
          </Label>

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <Input
                  value={field.value || ''}
                  onChange={e =>
                    onEmailChange(e.target.value, field.onChange)
                  }
                  type="email"
                  placeholder="name@domain.com"
                  aria-invalid={Boolean(fieldState.error)}
                  className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50"
                />
                {fieldState.error && (
                  <p className="text-sm font-medium text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Phone Number row */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-neutral-900">
            Phone number
          </Label>

          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-4">
            {/* Country Prefix Select */}
            <Controller
              name="phonePrefix"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Select
                    items={prefixOptions.map(opt => ({
                      value: opt.value,
                      label: opt.label,
                    }))}
                    value={field.value ?? '+421'}
                    onValueChange={val =>
                      onPhonePrefixChange(val, field.onChange)
                    }
                  >
                    <SelectTrigger
                      aria-invalid={Boolean(fieldState.error)}
                      className="w-full focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50"
                    >
                      <SelectValue placeholder="Prefix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {prefixOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
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

            {/* Phone Number Digits Input */}
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Input
                    value={field.value || ''}
                    onChange={e =>
                      onPhoneNumberChange(e.target.value, field.onChange)
                    }
                    type="tel"
                    inputMode="numeric"
                    placeholder="123 321 123"
                    aria-invalid={Boolean(fieldState.error)}
                    className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50"
                  />
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
      </div>
    </div>
  )
}

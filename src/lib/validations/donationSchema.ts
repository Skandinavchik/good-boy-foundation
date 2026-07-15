import { z } from 'zod'

export const donationFormSchema = z
  .object({
    helpType: z.enum(['foundation', 'shelter']),
    shelterID: z.number().optional(),
    value: z
      .union([z.number(), z.string()])
      .superRefine((val, ctx) => {
        const strVal =
          typeof val === 'string'
            ? val.replace(/,/g, '.').trim()
            : val.toString()
        const parts = strVal.split('.')
        if (parts.length === 2 && parts[1].length > 2) {
          ctx.addIssue({
            code: 'custom',
            message: 'Donation amount can have at most 2 decimal places',
          })
          return
        }

        const num =
          typeof val === 'string'
            ? parseFloat(val.replace(/,/g, '.').trim())
            : val
        if (isNaN(num) || num < 0.01) {
          ctx.addIssue({
            code: 'custom',
            message: 'Donation amount must be at least 0.01 €',
          })
        }
      }),
    firstName: z
      .string()
      .min(2, 'First name must be between 2 and 20 characters')
      .max(20, 'First name must be between 2 and 20 characters')
      .optional()
      .or(z.literal('')),
    lastName: z
      .string()
      .min(2, 'Last name must be between 2 and 30 characters')
      .max(30, 'Last name must be between 2 and 30 characters'),
    email: z.email('Please enter a valid e-mail address'),
    phonePrefix: z.enum(['+421', '+420']),
    phoneNumber: z
      .string()
      .superRefine((val, ctx) => {
        const digitsOnly = val.replace(/\D/g, '')
        if (digitsOnly.length < 9) {
          ctx.addIssue({
            code: 'custom',
            message: 'Phone number must contain at least 9 digits',
          })
        } else if (digitsOnly.length > 12) {
          ctx.addIssue({
            code: 'custom',
            message: 'Phone number must contain at most 12 digits',
          })
        }
      }),
    consentAgreed: z.boolean().refine(val => val === true, {
      message: 'You must agree with the processing of your personal data',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.helpType === 'shelter' && (!data.shelterID || data.shelterID <= 0)) {
      ctx.addIssue({
        code: 'custom',
        path: ['shelterID'],
        message: 'Please select a shelter',
      })
    }
  })

export type DonationFormData = z.infer<typeof donationFormSchema>

export interface ApiContributor {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface ApiDonationPayload {
  contributors: ApiContributor[]
  shelterID?: number
  value: number
}

export const toApiPayload = (data: DonationFormData): ApiDonationPayload => {
  const rawVal =
    typeof data.value === 'string'
      ? parseFloat(data.value.replace(/,/g, '.').trim())
      : data.value
  const cleanVal = isNaN(rawVal) ? 0 : Math.round(rawVal * 100) / 100

  const cleanPhoneDigits = data.phoneNumber.replace(/\D/g, '')
  const formattedPhoneDigits =
    cleanPhoneDigits.length === 9
      ? cleanPhoneDigits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
      : data.phoneNumber.trim()

  return {
    contributors: [
      {
        firstName: data.firstName?.trim() || 'Anonym',
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: `${data.phonePrefix} ${formattedPhoneDigits}`.trim(),
      },
    ],
    ...(data.shelterID !== undefined &&
    data.shelterID !== null &&
    data.shelterID > 0
      ? { shelterID: data.shelterID }
      : {}),
    value: cleanVal,
  }
}

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
      .min(9, 'Phone number must contain at least 9 digits')
      .regex(/^[0-9\s]+$/, 'Phone number must contain digits only'),
    consentAgreed: z.boolean(),
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
  firstName?: string
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

  return {
    contributors: [
      {
        firstName:
          data.firstName && data.firstName.trim().length > 0
            ? data.firstName.trim()
            : undefined,
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: `${data.phonePrefix} ${data.phoneNumber.trim()}`.trim(),
      },
    ],
    shelterID: data.helpType === 'shelter' ? data.shelterID : undefined,
    value: cleanVal,
  }
}

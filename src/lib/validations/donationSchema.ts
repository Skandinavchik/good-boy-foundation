import { z } from 'zod'

export const donationFormSchema = z
  .object({
    helpType: z.enum(['foundation', 'shelter']),
    shelterID: z.number().optional(),
    value: z
      .number()
      .positive('Donation amount must be greater than 0')
      .min(0.01, 'Donation amount must be at least 0.01 €'),
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
  return {
    contributors: [
      {
        firstName: data.firstName && data.firstName.trim().length > 0 ? data.firstName.trim() : undefined,
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: `${data.phonePrefix} ${data.phoneNumber.trim()}`.trim(),
      },
    ],
    shelterID: data.helpType === 'shelter' ? data.shelterID : undefined,
    value: data.value,
  }
}

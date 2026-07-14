import { z } from 'zod'

export const donationFormSchema = z.object({
  helpType: z.enum(['foundation', 'shelter']),
  shelterId: z.number().optional(),
  amount: z.number(),
  firstName: z.string().optional(),
  lastName: z.string(),
  email: z.string(),
  phonePrefix: z.string(),
  phoneNumber: z.string(),
  consentAgreed: z.boolean(),
})

export type DonationFormData = z.infer<typeof donationFormSchema>

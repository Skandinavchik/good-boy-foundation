import { z } from 'zod'

export const donationFormSchema = z
  .object({
    helpType: z.enum(['foundation', 'shelter']),
    shelterId: z.number().optional(),
    value: z.number().int().min(1, 'Donation amount must be at least 1 €'),
    firstName: z.string().optional(),
    lastName: z.string(),
    email: z.string(),
    phonePrefix: z.string(),
    phoneNumber: z.string(),
    consentAgreed: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.helpType === 'shelter' && (!data.shelterId || data.shelterId <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['shelterId'],
        message: 'Please select a shelter',
      })
    }
  })

export type DonationFormData = z.infer<typeof donationFormSchema>

import { useMutation, useQueryClient } from '@tanstack/react-query'
import ky, { HTTPError } from 'ky'
import { type ApiDonationPayload } from '@/lib/validations/donationSchema'

export const CONTRIBUTE_API_URL =
  'https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute'

export interface ContributeMessage {
  message: string
  type: 'ERROR' | 'WARNING' | 'INFO' | 'SUCCESS'
}

export interface ContributeResponse {
  messages: ContributeMessage[]
  [key: string]: unknown
}

export const formatApiErrorMessage = (rawMessage: string): string => {
  if (!rawMessage) return 'Unknown error occurred.'
  if (rawMessage.includes('firstName')) {
    return 'First name cannot be empty (the API server requires a valid first name).'
  }
  if (rawMessage.includes('lastName')) {
    return 'Last name is required by the API server.'
  }
  if (rawMessage.includes('email')) {
    return 'A valid email address is required by the API server.'
  }
  if (rawMessage.includes('phone')) {
    return 'Phone number format is invalid according to server rules.'
  }
  if (rawMessage.includes('shelterID')) {
    return 'Please select a valid shelter.'
  }
  if (rawMessage.includes('value')) {
    return 'Donation amount is invalid according to server rules.'
  }
  if (
    rawMessage.includes('Príspevok') ||
    rawMessage.includes('Chyba') ||
    rawMessage.includes('Povinn') ||
    /[áäčďéíĺľňóôŕšťúýž]/i.test(rawMessage)
  ) {
    return 'An error occurred while processing your request. Please verify your details and try again.'
  }
  return rawMessage
}

export const submitContribution = async (
  payload: ApiDonationPayload,
): Promise<ContributeResponse> => {
  const response = await ky
    .post(CONTRIBUTE_API_URL, { json: payload })
    .json<ContributeResponse>()

  if (
    response.messages &&
    Array.isArray(response.messages) &&
    response.messages.some(m => m.type === 'ERROR')
  ) {
    const errorMsgs = response.messages
      .filter(m => m.type === 'ERROR')
      .map(m => formatApiErrorMessage(m.message || ''))
      .join(', ')
    throw new Error(errorMsgs || 'Submission failed')
  }

  return response
}

export const extractContributionErrorMessage = async (
  error: unknown,
): Promise<string> => {
  if (error instanceof HTTPError) {
    try {
      const body = await error.response.json<ContributeResponse>()
      if (
        body.messages &&
        Array.isArray(body.messages) &&
        body.messages.length > 0
      ) {
        const msgs = body.messages
          .map(m => formatApiErrorMessage(m.message || ''))
          .filter(Boolean)
          .join(', ')
        if (msgs) return msgs
      }
      if (body.message && typeof body.message === 'string') {
        return formatApiErrorMessage(body.message)
      }
      if (body.error && typeof body.error === 'string') {
        return formatApiErrorMessage(body.error)
      }
    } catch {
      // JSON parse failed, fall through to status code message
    }
    return `Server error (${error.response.status}): ${error.response.statusText || 'Failed to submit donation'}`
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'An unexpected error occurred while submitting your donation. Please check your details and try again.'
}

export const useContribute = () => {
  const queryClient = useQueryClient()
  return useMutation<ContributeResponse, Error, ApiDonationPayload>({
    mutationFn: submitContribution,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shelters-results'] })
      void queryClient.invalidateQueries({ queryKey: ['shelters'] })
    },
  })
}

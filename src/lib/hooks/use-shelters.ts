import { useQuery } from '@tanstack/react-query'
import ky from 'ky'

export interface Shelter {
  id: number
  name: string
}

export interface SheltersResponse {
  shelters: Shelter[]
}

export const SHELTERS_API_URL =
  'https://frontend-assignment-api.goodrequest.dev/api/v1/shelters'

export const fetchShelters = async (): Promise<Shelter[]> => {
  const response = await ky.get(SHELTERS_API_URL).json<SheltersResponse>()
  return response.shelters
}

export const useShelters = (enabled = true) => {
  return useQuery<Shelter[], Error>({
    queryKey: ['shelters'],
    queryFn: fetchShelters,
    enabled,
    staleTime: 15 * 60 * 1000,
  })
}

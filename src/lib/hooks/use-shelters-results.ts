import { useQuery } from '@tanstack/react-query'
import ky from 'ky'

export const SHELTERS_RESULTS_API_URL =
  'https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/results'

export interface SheltersResults {
  contributors: number
  contribution: number | null
}

export const fetchSheltersResults = async (
  search?: string,
): Promise<SheltersResults> => {
  const searchParams = search ? { search } : undefined
  return await ky
    .get(SHELTERS_RESULTS_API_URL, { searchParams })
    .json<SheltersResults>()
}

export const useSheltersResults = (search?: string, enabled = true) => {
  return useQuery<SheltersResults, Error>({
    queryKey: ['shelters-results', search ?? ''],
    queryFn: () => fetchSheltersResults(search),
    enabled,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

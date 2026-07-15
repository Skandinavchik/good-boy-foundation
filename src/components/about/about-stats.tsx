'use client'

import type { FC } from 'react'
import { useSheltersResults } from '@/lib/hooks/use-shelters-results'

export const AboutStats: FC = () => {
  const { data, isLoading, isError } = useSheltersResults()

  const formatCurrency = (val: number | null | undefined): string => {
    if (val === null || val === undefined) return '0 €'
    const formatted = new Intl.NumberFormat('sk-SK', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(val)
    return `${formatted} €`
  }

  const formatNumber = (val: number | null | undefined): string => {
    if (val === null || val === undefined) return '0'
    return new Intl.NumberFormat('sk-SK').format(val)
  }

  return (
    <div className="my-10 border-y border-neutral-200 py-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 text-center">
        <div>
          {isLoading ? (
            <div className="mx-auto h-12 w-40 animate-pulse rounded-lg bg-neutral-200" />
          ) : isError ? (
            <div className="text-2xl font-bold tracking-tight text-neutral-400 sm:text-3xl">
              -- €
            </div>
          ) : (
            <div className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
              {formatCurrency(data?.contribution)}
            </div>
          )}
          <div className="mt-2 text-sm font-medium text-neutral-700">
            Total amount raised
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="mx-auto h-12 w-28 animate-pulse rounded-lg bg-neutral-200" />
          ) : isError ? (
            <div className="text-2xl font-bold tracking-tight text-neutral-400 sm:text-3xl">
              --
            </div>
          ) : (
            <div className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
              {formatNumber(data?.contributors)}
            </div>
          )}
          <div className="mt-2 text-sm font-medium text-neutral-700">
            Number of donors
          </div>
        </div>
      </div>
    </div>
  )
}

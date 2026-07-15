'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DonationFormData } from '@/lib/validations/donationSchema'

export interface DonationStoreState {
  currentStep: number
  attemptedSteps: Record<number, boolean>
  draftFormData: Partial<DonationFormData>
  isSubmitting: boolean
  isSubmittedSuccess: boolean
  hasHydrated: boolean
  lastSubmittedDonation: DonationFormData | null
}

export interface DonationStoreActions {
  setCurrentStep: (step: number | ((prev: number) => number)) => void
  setAttemptedStep: (step: number, attempted: boolean) => void
  updateDraftFormData: (data: Partial<DonationFormData>) => void
  setIsSubmitting: (submitting: boolean) => void
  setIsSubmittedSuccess: (success: boolean) => void
  setHasHydrated: (hydrated: boolean) => void
  setLastSubmittedDonation: (data: DonationFormData | null) => void
  resetStore: () => void
}

export type DonationStore = DonationStoreState & DonationStoreActions

export const initialDraftFormData: Partial<DonationFormData> = {
  helpType: 'foundation',
  shelterID: undefined,
  value: 50,
  firstName: '',
  lastName: '',
  email: '',
  phonePrefix: '+421',
  phoneNumber: '',
  consentAgreed: false,
}

const initialState: DonationStoreState = {
  currentStep: 0,
  attemptedSteps: {},
  draftFormData: initialDraftFormData,
  isSubmitting: false,
  isSubmittedSuccess: false,
  hasHydrated: false,
  lastSubmittedDonation: null,
}

export const useDonationStore = create<DonationStore>()(
  persist(
    set => ({
      ...initialState,
      setCurrentStep: step =>
        set(state => ({
          currentStep:
            typeof step === 'function' ? step(state.currentStep) : step,
        })),
      setAttemptedStep: (step, attempted) =>
        set(state => ({
          attemptedSteps: { ...state.attemptedSteps, [step]: attempted },
        })),
      updateDraftFormData: data =>
        set(state => ({
          draftFormData: { ...state.draftFormData, ...data },
        })),
      setIsSubmitting: submitting => set({ isSubmitting: submitting }),
      setIsSubmittedSuccess: success => set({ isSubmittedSuccess: success }),
      setHasHydrated: hydrated => set({ hasHydrated: hydrated }),
      setLastSubmittedDonation: data => set({ lastSubmittedDonation: data }),
      resetStore: () =>
        set({
          currentStep: 0,
          attemptedSteps: {},
          draftFormData: initialDraftFormData,
          isSubmitting: false,
          isSubmittedSuccess: false,
          hasHydrated: true,
          lastSubmittedDonation: null,
        }),
    }),
    {
      name: 'good-boy-donation-store',
      partialize: state => ({
        currentStep: state.currentStep,
        attemptedSteps: state.attemptedSteps,
        draftFormData: state.draftFormData,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    },
  ),
)

'use client'

import { useState, type FC, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type StepItem = {
  title?: string
  content: ReactNode
}

export type StepperProps = {
  items: StepItem[]
  current?: number
  defaultStep?: number
  onStepChange?: (stepIndex: number) => void
  onBeforeNext?: (currentStepIndex: number) => Promise<boolean> | boolean
  className?: string
}

export const Stepper: FC<StepperProps> = ({
  items,
  current,
  defaultStep = 0,
  onStepChange,
  onBeforeNext,
  className,
}) => {
  const [internalStep, setInternalStep] = useState<number>(defaultStep)
  const activeStep = current ?? internalStep
  const isLastStep = activeStep === items.length - 1

  const handleStepChange = (nextStep: number) => {
    setInternalStep(nextStep)
    onStepChange?.(nextStep)
  }

  const handleNext = async () => {
    if (onBeforeNext) {
      const canAdvance = await onBeforeNext(activeStep)
      if (!canAdvance) return
    }
    if (activeStep < items.length - 1) {
      handleStepChange(activeStep + 1)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      handleStepChange(activeStep - 1)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-1 flex-col justify-between gap-12 w-full',
        className,
      )}
    >
      <div>
        <nav aria-label="Progress" className="w-full">
          <ol className="flex items-center justify-between gap-2 sm:gap-4">
            {items.map((item, index) => {
              const isCompleted = index < activeStep
              const isActive = index === activeStep
              const isLast = index === items.length - 1
              const stepTitle = item.title ?? null

              return (
                <li
                  key={item.title || `step-${index}`}
                  className={cn(
                    'flex items-center',
                    isLast ? 'shrink-0' : 'flex-1',
                  )}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleStepChange(index)}
                    aria-current={isActive ? 'step' : undefined}
                    className="group flex h-auto cursor-pointer items-center gap-2.5 p-0 text-left hover:bg-transparent"
                  >
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : isCompleted
                            ? 'border border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border border-neutral-200 bg-neutral-100 text-neutral-400',
                      )}
                    >
                      {isCompleted ? (
                        <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={cn(
                        'text-sm transition-colors sm:inline',
                        isActive
                          ? 'font-semibold text-neutral-900'
                          : isCompleted
                            ? 'font-medium text-neutral-700'
                            : 'font-medium text-neutral-400',
                      )}
                    >
                      {stepTitle}
                    </span>
                  </Button>

                  {!isLast && (
                    <div
                      className={cn(
                        'ml-3 mr-1 h-[1px] flex-1 sm:mx-4',
                        isCompleted ? 'bg-indigo-600' : 'bg-neutral-200',
                      )}
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {items[activeStep]?.content && (
          <div className="mt-12">{items[activeStep].content}</div>
        )}
      </div>

      <div className="flex items-center justify-between pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBack}
          disabled={activeStep === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-6 py-5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 disabled:opacity-40"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
          <span>Back</span>
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={isLastStep}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-40"
        >
          <span>{isLastStep ? 'Submit form' : 'Continue'}</span>
          {!isLastStep && (
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  )
}

'use client'

import { useState, type FC, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
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
  attemptedSteps?: Record<number, boolean>
  onStepChange?: (stepIndex: number) => void | Promise<void>
  className?: string
}

export const Stepper: FC<StepperProps> = ({
  items,
  current,
  defaultStep = 0,
  attemptedSteps,
  onStepChange,
  className,
}) => {
  const [internalStep, setInternalStep] = useState<number>(defaultStep)
  const activeStep = current ?? internalStep

  const handleStepChange = (nextStep: number) => {
    setInternalStep(nextStep)
    void onStepChange?.(nextStep)
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
              const isCompleted = index < activeStep || Boolean(attemptedSteps?.[index])
              const isActive = index === activeStep
              const isFuture = index > activeStep && !attemptedSteps?.[index]
              const isLast = index === items.length - 1
              const stepTitle = item.title ?? null

              return (
                <li
                  key={stepTitle || `step-${index}`}
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
                    className={cn(
                      'group flex h-auto cursor-pointer items-center gap-2.5 p-0 text-left hover:bg-transparent',
                      isFuture && 'opacity-60 cursor-not-allowed',
                    )}
                  >
                    <span className="sr-only">
                      {isActive
                        ? 'Current step: '
                        : isCompleted
                          ? 'Completed step: '
                          : 'Upcoming step: '}
                    </span>
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
                      {isCompleted && !isActive ? (
                        <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={cn(
                        'hidden text-sm transition-colors sm:inline',
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
                        'ml-3 mr-1 h-px flex-1 sm:mx-4',
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
          <div
            key={activeStep}
            className="mt-12 animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both"
          >
            {items[activeStep].content}
          </div>
        )}
      </div>
    </div>
  )
}

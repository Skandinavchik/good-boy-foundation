import type { FC, ReactNode } from 'react'
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
  current: number
  onStepClick?: (stepIndex: number) => void
  className?: string
}

export const Stepper: FC<StepperProps> = ({
  items,
  current,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      <nav aria-label="Progress" className="w-full">
        <ol className="flex items-center justify-between gap-2 sm:gap-4">
          {items.map((item, index) => {
            const isCompleted = index < current
            const isActive = index === current
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
                  onClick={() => onStepClick?.(index)}
                  disabled={!onStepClick}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'group flex h-auto items-center gap-2.5 p-0 text-left hover:bg-transparent',
                    onStepClick ? 'cursor-pointer' : 'cursor-default',
                  )}
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

      {items[current]?.content && (
        <div className="mt-12">{items[current].content}</div>
      )}
    </div>
  )
}

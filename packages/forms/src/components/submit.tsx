import { Button, Spinner, cn } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function Submit({
  label,
  loading = false,
  type = 'submit',
  ...props
}: ComponentProps<typeof Button> & {
  label?: string
  loading?: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <Button
      disabled={loading}
      type={type}
      {...props}
    >
      <div className="relative">
        <span className={cn({ invisible: loading })}>
          {label ?? t(($) => $.submit)}
        </span>
        <Spinner
          className={cn(
            'trans absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2',
            { block: loading }
          )}
        />
      </div>
    </Button>
  )
}

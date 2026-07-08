import type { ErrorData } from '@/types'
import { FieldError } from '@gmcode/react-ui'
import { useTranslation } from 'react-i18next'

export function ErrorMonitor({ error }: { error?: ErrorData }) {
  // i18n
  const { t } = useTranslation()

  if (!error?.message) {
    return null
  }

  if (t) {
    // @ts-expect-error: assert error.message to be a translation key
    return <FieldError errors={{ message: t(error.message, error.params) }} />
  }

  return <FieldError errors={error} />
}

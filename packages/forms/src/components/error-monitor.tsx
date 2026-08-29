import { FieldError } from '@gmcode/react-ui'
import { useTranslation } from 'react-i18next'
import type { ErrorData } from '@/types'

export function ErrorMonitor({ error }: { error?: ErrorData }) {
  // i18n
  const { t } = useTranslation('forms')

  if (!error?.message) {
    return null
  }

  if (t.name === 'notReadyT') {
    return <FieldError errors={error} />
  }

  // @ts-expect-error: assert error.message to be a translation key
  return <FieldError errors={{ message: t(error.message, error.params) }} />
}

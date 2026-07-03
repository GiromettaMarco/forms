import { FieldError } from '@gmcode/react-ui'
import type { MessageParams } from '@gmcode/tsv-core'
import type { FieldError as RHFFieldError } from 'react-hook-form'

interface ErrorData {
  message?: string
  params?: MessageParams
}

export function ErrorMonitor({
  error,
  translator
}: {
  error?: RHFFieldError
  translator?: (error: ErrorData) => string
}) {
  if (!error) {
    return null
  }

  if (error.type === 'tsv' && translator) {
    return <FieldError errors={{ message: translator(error) }} />
  }

  return <FieldError errors={error} />
}

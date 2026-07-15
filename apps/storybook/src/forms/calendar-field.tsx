import { CalendarField as CalendarFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'

export function CalendarField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof CalendarFieldOriginal<TFieldValues>>
) {
  return <CalendarFieldOriginal {...props} />
}

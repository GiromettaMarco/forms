import { CalendarField as CalendarFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'

export function CalendarField(
  props: ComponentProps<typeof CalendarFieldOriginal>
) {
  return <CalendarFieldOriginal {...props} />
}

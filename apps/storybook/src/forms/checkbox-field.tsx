import { CheckboxField as CheckboxFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'

export function CheckboxField(
  props: ComponentProps<typeof CheckboxFieldOriginal>
) {
  return <CheckboxFieldOriginal {...props} />
}

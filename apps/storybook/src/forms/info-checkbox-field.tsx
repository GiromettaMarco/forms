import type { ComponentProps } from 'react'
import { InfoCheckboxField as InfoCheckboxFieldOriginal } from '@gmcode/forms'

export function InfoCheckboxField(
  props: ComponentProps<typeof InfoCheckboxFieldOriginal>
) {
  return <InfoCheckboxFieldOriginal {...props} />
}

import type { ComponentProps } from 'react'
import { NumericField as NumericFieldOriginal } from '@gmcode/forms'

export function NumericField(
  props: ComponentProps<typeof NumericFieldOriginal>
) {
  return <NumericFieldOriginal {...props} />
}

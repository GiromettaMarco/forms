import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { NumericField as NumericFieldOriginal } from '@gmcode/forms'

export function NumericField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof NumericFieldOriginal<TFieldValues>>
) {
  return <NumericFieldOriginal {...props} />
}

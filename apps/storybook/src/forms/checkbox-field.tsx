import { CheckboxField as CheckboxFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'

export function CheckboxField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof CheckboxFieldOriginal<TFieldValues>>
) {
  return <CheckboxFieldOriginal {...props} />
}

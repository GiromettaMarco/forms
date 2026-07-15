import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { SwitchField as SwitchFieldOriginal } from '@gmcode/forms'

export function SwitchField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof SwitchFieldOriginal<TFieldValues>>
) {
  return <SwitchFieldOriginal {...props} />
}

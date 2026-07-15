import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { TextField as TextFieldOriginal } from '@gmcode/forms'

export function TextField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof TextFieldOriginal<TFieldValues>>
) {
  return <TextFieldOriginal {...props} />
}

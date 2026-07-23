import { TextField as TextFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'

export function TextField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof TextFieldOriginal<TFieldValues>>
) {
  return <TextFieldOriginal {...props} />
}

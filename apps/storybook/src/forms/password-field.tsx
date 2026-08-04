import { PasswordField as PasswordFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'

export function PasswordField<TFieldValues extends FieldValues = FieldValues>(
  props: ComponentProps<typeof PasswordFieldOriginal<TFieldValues>>
) {
  return <PasswordFieldOriginal {...props} />
}

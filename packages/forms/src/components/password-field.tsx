import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { InputField } from '@/components/input-field'

export function PasswordField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'off',
  type = 'password',
  ...props
}: ComponentProps<typeof InputField<TFieldValues>>) {
  return (
    <InputField
      autoComplete={autoComplete}
      type={type}
      {...props}
    />
  )
}

import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { InputField } from '@/components/input-field'

export function EmailField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'on',
  type = 'email',
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

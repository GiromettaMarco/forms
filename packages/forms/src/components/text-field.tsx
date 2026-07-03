import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { InputField } from '@/components/input-field'

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'on',
  type = 'text',
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

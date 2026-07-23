import { cn } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'
import { InputField } from '@/components/input-field'

export function HiddenField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'off',
  className,
  type = 'hidden',
  ...props
}: ComponentProps<typeof InputField<TFieldValues>>) {
  return (
    <InputField
      autoComplete={autoComplete}
      className={cn('hidden', className)}
      type={type}
      {...props}
    />
  )
}

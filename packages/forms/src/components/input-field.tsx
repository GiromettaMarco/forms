import { Field, FieldLabel, Input } from '@gmcode/react-ui'
import type {
  ChangeEventHandler,
  ComponentProps,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute
} from 'react'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { ErrorMonitor } from '@/components/error-monitor'

export function InputField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  disabled,
  inputId,
  inputName,
  label,
  placeholder,
  readOnly,
  type,
  ...props
}: Omit<ComponentProps<typeof Field>, 'onChange'> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  onChange?: ChangeEventHandler<HTMLDivElement, HTMLInputElement>
  placeholder?: string
  readOnly?: boolean
  type?: HTMLInputTypeAttribute
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && (
            <FieldLabel htmlFor={inputId ?? inputName}>{label}</FieldLabel>
          )}

          <Input
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            id={inputId ?? (label ? inputName : undefined)}
            placeholder={placeholder}
            readOnly={readOnly}
            type={type}
            {...field}
          />

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

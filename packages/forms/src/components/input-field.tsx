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
  inputClassName,
  inputId,
  inputName,
  label,
  labelClassName,
  placeholder,
  readOnly,
  type,
  ...props
}: Omit<ComponentProps<typeof Field>, 'onChange'> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  disabled?: boolean
  inputClassName?: string
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  labelClassName?: string
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
            <FieldLabel
              className={labelClassName}
              htmlFor={inputId ?? inputName}
            >
              {label}
            </FieldLabel>
          )}

          <Input
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            className={inputClassName}
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

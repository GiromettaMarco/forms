import {
  Field,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@gmcode/react-ui'
import type {
  ComponentProps,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute
} from 'react'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { ErrorMonitor } from '@/components/error-monitor'
import type { Option } from '@/types'

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  description,
  disabled,
  inputId,
  inputName,
  label,
  options,
  placeholder,
  ...props
}: ComponentProps<typeof Field> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  description?: string
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  options: Option[]
  placeholder?: string
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

          <Select
            autoComplete={autoComplete}
            disabled={field.disabled}
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger
              aria-invalid={fieldState.invalid}
              id={inputId ?? (label ? inputName : undefined)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  id={option.id}
                  key={option.key ?? option.id ?? option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {description && <FieldDescription>{description}</FieldDescription>}

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@gmcode/react-ui'
import { X } from 'lucide-react'
import type {
  ComponentProps,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute
} from 'react'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type {
  FieldPathValue,
  FieldValues,
  UseFormSetValue
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ErrorMonitor } from '@/components/error-monitor'
import type { Option } from '@/types'

export function NullableSelectField<
  TFieldValues extends FieldValues = FieldValues
>({
  autoComplete,
  control,
  description,
  disabled,
  inputId,
  inputName,
  label,
  options,
  placeholder,
  setValue,
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
  setValue: UseFormSetValue<TFieldValues>
  type?: HTMLInputTypeAttribute
}) {
  // i18n
  const { t } = useTranslation()

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

          <div className="flex items-end gap-4">
            <Select
              autoComplete={autoComplete}
              disabled={field.disabled}
              name={field.name}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                className="flex-1 overflow-hidden"
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

            <Button
              aria-label={t(($) => $.reset)}
              className="flex-none"
              onClick={() =>
                setValue(
                  inputName,
                  '' as FieldPathValue<TFieldValues, FieldPath<TFieldValues>>
                )
              }
              type="button"
              variant="outline"
            >
              <X />
            </Button>
          </div>

          {description && <FieldDescription>{description}</FieldDescription>}

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

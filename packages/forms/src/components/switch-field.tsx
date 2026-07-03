import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Field, FieldLabel, Switch } from '@gmcode/react-ui'
import type { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { ErrorMonitor } from '@/components/error-monitor'

export function SwitchField<TFieldValues extends FieldValues = FieldValues>({
  control,
  disabled,
  inputId,
  inputName,
  label,
  onCheckedChange,
  orientation = 'horizontal',
  readOnly,
  uncheckedValue = '',
  value = 'true',
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  onCheckedChange?: (
    checked: CheckboxPrimitive.CheckedState,
    field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>
  ) => void
  readOnly?: boolean
  uncheckedValue?: string
  value?: string
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          orientation={orientation}
          {...props}
        >
          <Switch
            aria-invalid={fieldState.invalid}
            aria-readonly={readOnly}
            checked={field.value === value}
            className="aria-readonly:opacity-50"
            disabled={field.disabled}
            id={inputId ?? (label ? inputName : undefined)}
            name={field.name}
            onBlur={field.onBlur}
            onCheckedChange={(checked) => {
              if (!readOnly) {
                field.onChange(checked === true ? value : uncheckedValue)
                if (onCheckedChange) onCheckedChange(checked, field)
              }
            }}
            ref={field.ref}
            value={value}
          />

          {label && (
            <FieldLabel htmlFor={inputId ?? inputName}>{label}</FieldLabel>
          )}

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

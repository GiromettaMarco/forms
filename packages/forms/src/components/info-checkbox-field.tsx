import { Checkbox, Field, Label, cn } from '@gmcode/react-ui'
import type { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { ErrorMonitor } from '@/components/error-monitor'

export function InfoCheckboxField<
  TFieldValues extends FieldValues = FieldValues
>({
  children,
  className,
  control,
  disabled,
  inputId,
  inputName,
  label,
  onCheckedChange,
  orientation = 'horizontal',
  readOnly,
  text,
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
  text?: string
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
          className={cn('block', className)}
          data-invalid={fieldState.invalid}
          orientation={orientation}
          {...props}
        >
          <Label
            className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-aria-checked:border-info-foreground has-aria-checked:bg-info"
            data-slot="field-label"
          >
            <Checkbox
              aria-invalid={fieldState.invalid}
              aria-readonly={readOnly}
              checked={field.value === value}
              className="aria-readonly:opacity-50 data-[state=checked]:border-info-foreground data-[state=checked]:bg-info-foreground data-[state=checked]:text-white dark:data-[state=checked]:border-info-foreground dark:data-[state=checked]:bg-info-foreground"
              disabled={field.disabled}
              id={inputId}
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

            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{label}</p>
              {text ? (
                <p className="text-sm text-muted-foreground">{text}</p>
              ) : (
                children
              )}
              <ErrorMonitor error={fieldState.error} />
            </div>
          </Label>
        </Field>
      )}
    />
  )
}

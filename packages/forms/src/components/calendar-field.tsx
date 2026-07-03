import { Calendar, Field, FieldLabel } from '@gmcode/react-ui'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { ComponentProps } from 'react'
import type { DayPickerLocale } from 'react-day-picker'
import { ErrorMonitor } from '@/components/error-monitor'
import type { FieldValues } from 'react-hook-form'
import { defaultDateFormatter } from '@/lib/utils'

export function CalendarField<TFieldValues extends FieldValues = FieldValues>({
  control,
  formatter = defaultDateFormatter,
  inputId,
  inputName,
  label,
  locale,
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  formatter?: (date: Date) => string
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  locale?: Partial<DayPickerLocale>
}) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && (
            <FieldLabel htmlFor={inputId ?? inputName}>{label}</FieldLabel>
          )}

          <Calendar
            aria-invalid={fieldState.invalid}
            className="w-full rounded-md border"
            fixedWeeks={true}
            id={inputId ?? (label ? inputName : undefined)}
            locale={locale}
            mode="single"
            onSelect={(date) => field.onChange(date ? formatter(date) : '')}
            selected={field.value}
          />

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

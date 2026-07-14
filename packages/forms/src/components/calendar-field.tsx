import { Calendar, Field, FieldLabel } from '@gmcode/react-ui'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { DayPickerLocale, Matcher } from 'react-day-picker'
import {
  dateToString as defaultDateToString,
  stringToDate as defaultStringToDate
} from '@/lib/utils'
import type { ComponentProps } from 'react'
import { ErrorMonitor } from '@/components/error-monitor'
import type { FieldValues } from 'react-hook-form'

export function CalendarField<TFieldValues extends FieldValues = FieldValues>({
  control,
  dateToString = defaultDateToString,
  disabled,
  inputId,
  inputName,
  label,
  locale,
  stringToDate = defaultStringToDate,
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  dateToString?: (date: Date) => string
  disabled?: Matcher | Matcher[]
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  locale?: Partial<DayPickerLocale>
  stringToDate?: (string: string | undefined) => Date | undefined
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
            disabled={disabled}
            fixedWeeks={true}
            id={inputId ?? (label ? inputName : undefined)}
            locale={locale}
            mode="single"
            onSelect={(date) => field.onChange(date ? dateToString(date) : '')}
            selected={stringToDate(field.value)}
          />

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

import { type Control, Controller, type FieldPath } from 'react-hook-form'
import { Field, FieldLabel, TextareaAutosize, cn } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'
import { ErrorMonitor } from '@/components/error-monitor'
import type { FieldValues } from 'react-hook-form'
import type { TextareaHeightChangeMeta } from 'react-textarea-autosize'

export function TextareaField<TFieldValues extends FieldValues = FieldValues>({
  cacheMeasurements,
  control,
  inputId,
  inputName,
  label,
  maxRows,
  minRows,
  onHeightChange,
  placeholder,
  resize = 'none',
  ...props
}: ComponentProps<typeof Field> & {
  cacheMeasurements?: boolean
  control: Control<TFieldValues>
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  maxRows?: number
  minRows?: number
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void
  placeholder?: string
  resize?: 'both' | 'none' | 'x' | 'y'
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

          <TextareaAutosize
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            cacheMeasurements={cacheMeasurements}
            className={cn({
              resize: resize === 'both',
              'resize-none': resize === 'none',
              'resize-x': resize === 'x',
              'resize-y': resize === 'y'
            })}
            id={inputId ?? (label ? inputName : undefined)}
            maxRows={maxRows}
            minRows={minRows}
            onHeightChange={onHeightChange}
            placeholder={placeholder}
            {...field}
          />

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

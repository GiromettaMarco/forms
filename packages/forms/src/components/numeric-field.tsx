import type {
  ComponentProps,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute
} from 'react'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@gmcode/react-ui'
import type {
  FieldPathValue,
  FieldValues,
  UseFormSetValue
} from 'react-hook-form'
import { Minus, Plus } from 'lucide-react'
import { ErrorMonitor } from '@/components/error-monitor'
import { useTranslation } from 'react-i18next'

function stepInput(
  original: string,
  add: boolean,
  step?: number,
  min?: number,
  max?: number
) {
  let parsed = Number(original)

  if (isNaN(parsed)) {
    return ''
  }

  if (add) {
    parsed += step === undefined ? 1 : step
  } else {
    parsed -= step === undefined ? 1 : step
  }

  if (min !== undefined) {
    parsed = Math.max(parsed, min)
  }

  if (max !== undefined) {
    parsed = Math.min(parsed, max)
  }

  return parsed.toString()
}

export function NumericField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  disabled,
  inputId,
  inputMode = 'numeric',
  inputName,
  label,
  placeholder,
  type,
  ui,
  ...props
}: ComponentProps<typeof Field> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputMode?: 'decimal' | 'numeric'
  inputName: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  ui?: {
    max?: number
    min?: number
    setValue: UseFormSetValue<TFieldValues>
    step?: number
  }
}) {
  // i18n
  const { t } = useTranslation()

  function stepValue(value: string, add: boolean) {
    if (ui?.setValue) {
      ui.setValue(
        inputName,
        stepInput(value, add, ui.step, ui.min, ui.max) as FieldPathValue<
          TFieldValues,
          FieldPath<TFieldValues>
        >,
        { shouldValidate: true }
      )
    }
  }

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

          <InputGroup>
            <InputGroupInput
              aria-invalid={fieldState.invalid}
              autoComplete={autoComplete}
              id={inputId ?? (label ? inputName : undefined)}
              inputMode={inputMode}
              placeholder={placeholder}
              type={type}
              {...field}
            />

            {ui && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={t(($) => $.decrease)}
                  disabled={disabled}
                  onClick={() => stepValue(field.value, false)}
                  size="icon-xs"
                >
                  <Minus />
                </InputGroupButton>

                <InputGroupButton
                  aria-label={t(($) => $.increase)}
                  disabled={disabled}
                  onClick={() => stepValue(field.value, true)}
                  size="icon-xs"
                >
                  <Plus />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

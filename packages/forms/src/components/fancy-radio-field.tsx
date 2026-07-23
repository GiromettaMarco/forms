import {
  FieldDescription,
  FieldLabel,
  FieldSet,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@gmcode/react-ui'
import type { ComponentProps, FC, SVGProps } from 'react'
import { type Control, Controller, type FieldPath } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { ErrorMonitor } from '@/components/error-monitor'
import type { Option } from '@/types'

export function FancyRadioField<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  defaultValue,
  description,
  disabled,
  groupId,
  inputName,
  label,
  options,
  ...props
}: ComponentProps<typeof FieldSet> & {
  control: Control<TFieldValues>
  defaultValue: string
  description?: string
  disabled?: boolean
  groupId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  options: Array<Option & { Icon?: FC<SVGProps<SVGSVGElement>> }>
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <FieldSet
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && (
            <FieldLabel htmlFor={groupId ?? inputName}>{label}</FieldLabel>
          )}

          {description && <FieldDescription>{description}</FieldDescription>}

          <ErrorMonitor error={fieldState.error} />

          <RadioGroup
            defaultValue={defaultValue}
            disabled={field.disabled}
            id={groupId ?? (label ? inputName : undefined)}
            name={field.name}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
            ref={field.ref}
          >
            {options.map((option) => (
              <Label
                className="rounded-md border ring-ring/50 transition-all hover:bg-accent/50 has-focus-visible:ring-[3px]"
                data-slot="field-label"
                key={option.key ?? option.id ?? option.value}
              >
                <div className="flex w-full items-center gap-3 rounded-md p-3 transition-all has-aria-checked:border-l-8 has-aria-checked:border-ring">
                  <RadioGroupItem
                    className="sr-only"
                    id={option.id}
                    value={option.value}
                  />
                  {option.Icon && <option.Icon />}
                  {option.label}
                </div>
              </Label>
            ))}
          </RadioGroup>
        </FieldSet>
      )}
    />
  )
}

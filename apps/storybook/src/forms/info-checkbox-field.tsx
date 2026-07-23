import { InfoCheckboxField as InfoCheckboxFieldOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'
import type { FieldValues } from 'react-hook-form'

export function InfoCheckboxField<
  TFieldValues extends FieldValues = FieldValues
>(props: ComponentProps<typeof InfoCheckboxFieldOriginal<TFieldValues>>) {
  return <InfoCheckboxFieldOriginal {...props} />
}

import {
  FieldContent as FieldContentOriginal,
  FieldDescription as FieldDescriptionOriginal,
  FieldError as FieldErrorOriginal,
  FieldGroup as FieldGroupOriginal,
  FieldLabel as FieldLabelOriginal,
  FieldLegend as FieldLegendOriginal,
  Field as FieldOriginal,
  FieldSeparator as FieldSeparatorOriginal,
  FieldSet as FieldSetOriginal,
  FieldTitle as FieldTitleOriginal
} from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Field(props: ComponentProps<typeof FieldOriginal>) {
  return <FieldOriginal {...props} />
}

export function FieldContent(
  props: ComponentProps<typeof FieldContentOriginal>
) {
  return <FieldContentOriginal {...props} />
}

export function FieldDescription(
  props: ComponentProps<typeof FieldDescriptionOriginal>
) {
  return <FieldDescriptionOriginal {...props} />
}

export function FieldError(props: ComponentProps<typeof FieldErrorOriginal>) {
  return <FieldErrorOriginal {...props} />
}

export function FieldGroup(props: ComponentProps<typeof FieldGroupOriginal>) {
  return <FieldGroupOriginal {...props} />
}

export function FieldLabel(props: ComponentProps<typeof FieldLabelOriginal>) {
  return <FieldLabelOriginal {...props} />
}

export function FieldLegend(props: ComponentProps<typeof FieldLegendOriginal>) {
  return <FieldLegendOriginal {...props} />
}

export function FieldSeparator(
  props: ComponentProps<typeof FieldSeparatorOriginal>
) {
  return <FieldSeparatorOriginal {...props} />
}

export function FieldSet(props: ComponentProps<typeof FieldSetOriginal>) {
  return <FieldSetOriginal {...props} />
}

export function FieldTitle(props: ComponentProps<typeof FieldTitleOriginal>) {
  return <FieldTitleOriginal {...props} />
}

import {
  SelectContent as SelectContentOriginal,
  SelectGroup as SelectGroupOriginal,
  SelectItem as SelectItemOriginal,
  SelectLabel as SelectLabelOriginal,
  Select as SelectOriginal,
  SelectSeparator as SelectSeparatorOriginal,
  SelectTrigger as SelectTriggerOriginal,
  SelectValue as SelectValueOriginal
} from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Select(props: ComponentProps<typeof SelectOriginal>) {
  return <SelectOriginal {...props} />
}

export function SelectContent(
  props: ComponentProps<typeof SelectContentOriginal>
) {
  return <SelectContentOriginal {...props} />
}

export function SelectGroup(props: ComponentProps<typeof SelectGroupOriginal>) {
  return <SelectGroupOriginal {...props} />
}

export function SelectItem(props: ComponentProps<typeof SelectItemOriginal>) {
  return <SelectItemOriginal {...props} />
}

export function SelectLabel(props: ComponentProps<typeof SelectLabelOriginal>) {
  return <SelectLabelOriginal {...props} />
}

export function SelectSeparator(
  props: ComponentProps<typeof SelectSeparatorOriginal>
) {
  return <SelectSeparatorOriginal {...props} />
}

export function SelectTrigger(
  props: ComponentProps<typeof SelectTriggerOriginal>
) {
  return <SelectTriggerOriginal {...props} />
}

export function SelectValue(props: ComponentProps<typeof SelectValueOriginal>) {
  return <SelectValueOriginal {...props} />
}

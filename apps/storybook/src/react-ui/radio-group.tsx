import {
  RadioGroupItem as RadioGroupItemOriginal,
  RadioGroup as RadioGroupOriginal
} from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function RadioGroup(props: ComponentProps<typeof RadioGroupOriginal>) {
  return <RadioGroupOriginal {...props} />
}

export function RadioGroupItem(
  props: ComponentProps<typeof RadioGroupItemOriginal>
) {
  return <RadioGroupItemOriginal {...props} />
}

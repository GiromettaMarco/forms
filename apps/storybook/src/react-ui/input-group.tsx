import {
  InputGroupAddon as InputGroupAddonOriginal,
  InputGroupButton as InputGroupButtonOriginal,
  InputGroupInput as InputGroupInputOriginal,
  InputGroup as InputGroupOriginal,
  InputGroupText as InputGroupTextOriginal,
  InputGroupTextarea as InputGroupTextareaOriginal
} from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function InputGroup(props: ComponentProps<typeof InputGroupOriginal>) {
  return <InputGroupOriginal {...props} />
}

export function InputGroupAddon(
  props: ComponentProps<typeof InputGroupAddonOriginal>
) {
  return <InputGroupAddonOriginal {...props} />
}

export function InputGroupButton(
  props: ComponentProps<typeof InputGroupButtonOriginal>
) {
  return <InputGroupButtonOriginal {...props} />
}

export function InputGroupInput(
  props: ComponentProps<typeof InputGroupInputOriginal>
) {
  return <InputGroupInputOriginal {...props} />
}

export function InputGroupText(
  props: ComponentProps<typeof InputGroupTextOriginal>
) {
  return <InputGroupTextOriginal {...props} />
}

export function InputGroupTextarea(
  props: ComponentProps<typeof InputGroupTextareaOriginal>
) {
  return <InputGroupTextareaOriginal {...props} />
}

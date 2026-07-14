import type { ComponentProps } from 'react'
import { TextField as TextFieldOriginal } from '@gmcode/forms'

export function TextField(props: ComponentProps<typeof TextFieldOriginal>) {
  return <TextFieldOriginal {...props} />
}

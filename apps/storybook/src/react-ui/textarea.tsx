import type { ComponentProps } from 'react'
import { Textarea as TextareaOriginal } from '@gmcode/react-ui'

export function Textarea(props: ComponentProps<typeof TextareaOriginal>) {
  return <TextareaOriginal {...props} />
}

import { Textarea as TextareaOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Textarea(props: ComponentProps<typeof TextareaOriginal>) {
  return <TextareaOriginal {...props} />
}

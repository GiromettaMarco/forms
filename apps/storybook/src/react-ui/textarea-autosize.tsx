import type { ComponentProps } from 'react'
import { TextareaAutosize as TextareaAutosizeOriginal } from '@gmcode/react-ui'

export function TextareaAutosize(
  props: ComponentProps<typeof TextareaAutosizeOriginal>
) {
  return <TextareaAutosizeOriginal {...props} />
}

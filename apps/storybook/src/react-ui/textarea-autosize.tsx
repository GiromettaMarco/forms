import { TextareaAutosize as TextareaAutosizeOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function TextareaAutosize(
  props: ComponentProps<typeof TextareaAutosizeOriginal>
) {
  return <TextareaAutosizeOriginal {...props} />
}

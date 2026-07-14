import { Checkbox as CheckboxOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Checkbox(props: ComponentProps<typeof CheckboxOriginal>) {
  return <CheckboxOriginal {...props} />
}

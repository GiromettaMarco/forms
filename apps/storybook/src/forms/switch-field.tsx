import type { ComponentProps } from 'react'
import { SwitchField as SwitchFieldOriginal } from '@gmcode/forms'

export function SwitchField(props: ComponentProps<typeof SwitchFieldOriginal>) {
  return <SwitchFieldOriginal {...props} />
}

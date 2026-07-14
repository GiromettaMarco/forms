import type { ComponentProps } from 'react'
import { Switch as SwitchOriginal } from '@gmcode/react-ui'

export function Switch(props: ComponentProps<typeof SwitchOriginal>) {
  return <SwitchOriginal {...props} />
}

import { Switch as SwitchOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Switch(props: ComponentProps<typeof SwitchOriginal>) {
  return <SwitchOriginal {...props} />
}

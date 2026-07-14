import type { ComponentProps } from 'react'
import { Label as LabelOriginal } from '@gmcode/react-ui'

export function Label(props: ComponentProps<typeof LabelOriginal>) {
  return <LabelOriginal {...props} />
}

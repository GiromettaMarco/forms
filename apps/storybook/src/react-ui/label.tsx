import { Label as LabelOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Label(props: ComponentProps<typeof LabelOriginal>) {
  return <LabelOriginal {...props} />
}

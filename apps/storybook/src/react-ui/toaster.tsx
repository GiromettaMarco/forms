import type { ComponentProps } from 'react'
import { Toaster as ToasterOriginal } from '@gmcode/react-ui'

export function Toaster(props: ComponentProps<typeof ToasterOriginal>) {
  return <ToasterOriginal {...props} />
}

import { Toaster as ToasterOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Toaster(props: ComponentProps<typeof ToasterOriginal>) {
  return <ToasterOriginal {...props} />
}

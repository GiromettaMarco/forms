import type { ComponentProps } from 'react'
import { Infobox as InfoboxOriginal } from '@gmcode/react-ui'

export function Infobox({
  variant = 'info',
  ...props
}: ComponentProps<typeof InfoboxOriginal>) {
  return (
    <InfoboxOriginal
      variant={variant}
      {...props}
    />
  )
}

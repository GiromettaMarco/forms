import { Infobox as InfoboxOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

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

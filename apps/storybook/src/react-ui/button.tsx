import { Button as ButtonOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Button({
  asChild = false,
  size = 'default',
  variant = 'default',
  ...props
}: ComponentProps<typeof ButtonOriginal>) {
  return (
    <ButtonOriginal
      asChild={asChild}
      size={size}
      variant={variant}
      {...props}
    />
  )
}

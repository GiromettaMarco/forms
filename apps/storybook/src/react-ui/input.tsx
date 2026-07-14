import type { ComponentProps } from 'react'
import { Input as InputOriginal } from '@gmcode/react-ui'

export function Input(props: ComponentProps<typeof InputOriginal>) {
  return <InputOriginal {...props} />
}

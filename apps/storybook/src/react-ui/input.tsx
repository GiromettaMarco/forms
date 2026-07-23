import { Input as InputOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Input(props: ComponentProps<typeof InputOriginal>) {
  return <InputOriginal {...props} />
}

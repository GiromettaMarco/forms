import { Spinner as SpinnerOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Spinner(props: ComponentProps<typeof SpinnerOriginal>) {
  return <SpinnerOriginal {...props} />
}

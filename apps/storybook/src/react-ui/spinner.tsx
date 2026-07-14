import type { ComponentProps } from 'react'
import { Spinner as SpinnerOriginal } from '@gmcode/react-ui'

export function Spinner(props: ComponentProps<typeof SpinnerOriginal>) {
  return <SpinnerOriginal {...props} />
}

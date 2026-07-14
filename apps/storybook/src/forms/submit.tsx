import type { ComponentProps } from 'react'
import { Submit as SubmitOriginal } from '@gmcode/forms'

export function Submit(props: ComponentProps<typeof SubmitOriginal>) {
  return <SubmitOriginal {...props} />
}

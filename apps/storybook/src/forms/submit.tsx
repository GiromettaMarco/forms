import { Submit as SubmitOriginal } from '@gmcode/forms'
import type { ComponentProps } from 'react'

export function Submit(props: ComponentProps<typeof SubmitOriginal>) {
  return <SubmitOriginal {...props} />
}

import type { ComponentProps } from 'react'
import { Form as FormOriginal } from '@gmcode/forms'

export function Form(props: ComponentProps<typeof FormOriginal>) {
  return <FormOriginal {...props} />
}

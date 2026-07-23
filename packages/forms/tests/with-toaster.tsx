import { Toaster } from '@gmcode/react-ui'
import type { PropsWithChildren } from 'react'

export function WithToaster({ children }: PropsWithChildren) {
  return (
    <div>
      <Toaster
        closeButton={true}
        duration={500000000}
        position="bottom-center"
        theme="system"
      />
      {children}
    </div>
  )
}

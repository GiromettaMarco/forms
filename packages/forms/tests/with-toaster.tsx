import type { PropsWithChildren } from 'react'
import { Toaster } from '@gmcode/react-ui'

export function WithToaster({ children }: PropsWithChildren) {
  return (
    <div>
      <Toaster
        closeButton={true}
        position="bottom-center"
        theme="system"
        duration={500000000}
      />
      {children}
    </div>
  )
}

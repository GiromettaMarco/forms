import type { PropsWithChildren } from 'react'

export function LayoutProvider({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen items-center overflow-auto">
      <div className="m-auto p-2">{children}</div>
    </div>
  )
}

import type { PropsWithChildren, ReactNode } from 'react'
import { type RenderOptions, render as renderBase } from 'vitest-browser-react'
import { LayoutProvider } from '../providers/layout-provider'
import { ThemeProvider } from '../providers/theme-provider'

function Wrapper({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </ThemeProvider>
  )
}

export function render(ui: ReactNode, options?: RenderOptions) {
  return renderBase(ui, { wrapper: Wrapper, ...options })
}

import type { PropsWithChildren, ReactNode } from 'react'
import { type RenderOptions, render as renderBase } from 'vitest-browser-react'
import { I18nProvider } from '../providers/i18n-provider'
import { LayoutProvider } from '../providers/layout-provider'
import { ThemeProvider } from '../providers/theme-provider'
import { ToasterProvider } from '../providers/toaster-provider'

function Wrapper({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ToasterProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ToasterProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export function render(ui: ReactNode, options?: RenderOptions) {
  return renderBase(ui, { wrapper: Wrapper, ...options })
}

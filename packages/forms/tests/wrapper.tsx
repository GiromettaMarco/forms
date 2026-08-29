import { Toaster } from '@gmcode/react-ui'
import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

export function WithI18n({ children }: PropsWithChildren) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export function WithToaster({ children }: PropsWithChildren) {
  return (
    <div>
      <Toaster
        closeButton={true}
        // duration={500_000_000}
        position="bottom-center"
        theme="system"
      />
      {children}
    </div>
  )
}

export function Wrapper({ children }: PropsWithChildren) {
  return (
    <WithI18n>
      <WithToaster>{children}</WithToaster>
    </WithI18n>
  )
}

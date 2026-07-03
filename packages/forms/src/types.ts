import type { ReactNode } from 'react'

export interface Option {
  id?: string
  key?: string | number
  label: ReactNode
  value: string
}

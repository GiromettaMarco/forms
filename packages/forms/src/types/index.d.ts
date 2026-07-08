import type { MessageParams } from '@gmcode/tsv-core'
import type { ReactNode } from 'react'

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

export type RouteDefinition<TMethod extends Method | Method[]> = {
  url: string
} & (TMethod extends Method[] ? { methods: TMethod } : { method: TMethod })

export interface Option {
  id?: string
  key?: string | number
  label: ReactNode
  value: string
}

export interface ErrorData {
  message?: string
  params?: MessageParams
}

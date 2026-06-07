import type { MessageParams } from '@/types'

export class Message {
  /**
   * The message text. Usually a translation key.
   */
  text: string

  /**
   * Parameters for a translation function.
   */
  params?: MessageParams

  constructor(text: string, params?: MessageParams) {
    this.text = text
    this.params = params
  }
}

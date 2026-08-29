import { type i18n as Ti18n, createInstance } from 'i18next'
import en from '@/locales/en'

/**
 * @deprecated Use the `forms` namespace instead.
 */
const i18n: Ti18n = createInstance({
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: { en }
})

void i18n.init()

export default i18n

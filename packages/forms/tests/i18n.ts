import i18n from 'i18next'
import { en, it } from '@/locales'

void i18n.init({
  fallbackLng: 'en',
  resources: {
    en: {
      forms: {
        ...en,
        name: {
          maxChars:
            'Your name cannot be longer than {{max}} characters. The chosen name is {{length}} characters long.',
          minChars:
            'Your name must be at least {{min}} characters. The chosen name is {{length}} characters long.',
          required: 'Fill the field with your name to proceed.'
        },
        password_confirm: {
          match: 'The passwords did not match'
        }
      }
    },
    it: {
      forms: it
    }
  },
  supportedLngs: ['en', 'it']
})

export default i18n

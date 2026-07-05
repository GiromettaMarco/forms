import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

void i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      validations: {
        maxChars:
          'Your username cannot be longer than {{max}} characters. The chosen name is {{length}} characters long.',
        minChars:
          'Your username must be at least {{min}} characters. The chosen name is {{length}} characters long.',
        required: 'Fill the field with your new username to proceed.'
      }
    },
    it: {
      validations: {
        maxChars:
          'Il tuo nome utente non può superare {{max}} caratteri. Il nome scelto è lungo {{length}} caratteri.',
        minChars:
          'Il tuo nome utente deve essere lungo almeno {{min}} caratteri. Il nome scelto è lungo {{length}} caratteri.',
        required: 'Inserisci il tuo nuovo nome utente per procedere.'
      }
    }
  },
  supportedLngs: ['en', 'it']
})

export default i18n

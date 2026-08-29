import { en, it } from '@gmcode/forms/locales'
import type { StoryContext } from '@storybook/react-vite'
import i18n from 'i18next'
import { useEffect } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import type { PartialStoryFn } from 'storybook/internal/csf'

void i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      forms: {
        ...en,
        password_confirm: {
          match: 'The passwords did not match'
        },
        username: {
          maxChars:
            'Your username cannot be longer than {{max}} characters. The chosen name is {{length}} characters long.',
          minChars:
            'Your username must be at least {{min}} characters. The chosen name is {{length}} characters long.',
          required: 'Fill the field with your new username to proceed.'
        }
      }
    },
    it: {
      forms: {
        ...it,
        password_confirm: {
          match: 'Le password non corrispondono'
        },
        username: {
          maxChars:
            'Il tuo nome utente non può superare {{max}} caratteri. Il nome scelto è lungo {{length}} caratteri.',
          minChars:
            'Il tuo nome utente deve essere lungo almeno {{min}} caratteri. Il nome scelto è lungo {{length}} caratteri.',
          required: 'Inserisci il tuo nuovo nome utente per procedere.'
        }
      }
    }
  },
  supportedLngs: ['en', 'it']
})

/**
 * Wrap stories with the I18nextProvider component.
 *
 * @see https://storybook.js.org/recipes/react-i18next
 */
export const WithI18next = (Story: PartialStoryFn, context: StoryContext) => {
  const { locale } = context.globals

  // Set the new locale in i18n when the locale global changes
  useEffect(() => {
    void i18n.changeLanguage(locale)
  }, [locale])

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  )
}

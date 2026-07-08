import type { PartialStoryFn } from 'storybook/internal/csf'
import type { StoryContext } from '@storybook/react-vite'
import i18n from '@/i18n'
import { useEffect } from 'react'

i18n.addResourceBundle(
  'en',
  'translation',
  {
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
  },
  true
)

i18n.addResourceBundle('it', 'translation', {
  array: 'Il campo deve essere un array.',
  date: 'Il campo deve essere una data valida',
  email: 'Il campo deve essere un indirizzo email valido.',
  integer: 'Il campo deve essere un numero intero.',
  maxChars: 'Il campo non può contenere più di {{max}} caratteri.',
  maxValue: 'Il campo non può essere superiore a {{max}}.',
  minChars: 'Il campo deve contenere almeno {{min}} caratteri.',
  minValue: 'Il campo deve essere almeno {{min}}.',
  missing: 'Il valore non è supportato.',
  number: 'Il campo deve essere un numero.',
  numeric: 'Il campo deve essere un numero.',
  password_confirm: {
    match: 'Le password non corrispondono'
  },
  required: 'Il campo è obbligatorio.',
  string: 'Il campo deve essere una stringa.',
  username: {
    maxChars:
      'Il tuo nome utente non può superare {{max}} caratteri. Il nome scelto è lungo {{length}} caratteri.',
    minChars:
      'Il tuo nome utente deve essere lungo almeno {{min}} caratteri. Il nome scelto è lungo {{length}} caratteri.',
    required: 'Inserisci il tuo nuovo nome utente per procedere.'
  }
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

  return <Story />
}

import './theme.css'

import 'vitest-browser-react'
import i18n from '@/i18n'

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

import './theme.css'
import 'vitest-browser-react'
import { i18n } from '@/index'
import { en } from '@/locales'
import { it } from '@/locales'

i18n.addResourceBundle(
  'en',
  'translation',
  {
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
  },
  true
)

i18n.addResourceBundle('it', 'translation', it, true)

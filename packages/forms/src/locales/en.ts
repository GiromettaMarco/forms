import type { Resource } from 'i18next'

export default {
  translation: {
    array: 'The field must be an array.',
    date: 'The field must be a valid date',
    decrease: 'Decrease',
    email: 'The field must be a valid email address.',
    hasMixed:
      'The field must contain at least one uppercase and one lowercase letter.',
    hasNumber: 'The field must contain at least one number.',
    hasSymbol: 'The field must contain at least one symbol.',
    increase: 'Increase',
    integer: 'The field must be an integer.',
    maxChars: 'The field must not be greater than {{max}} characters.',
    maxValue: 'The field must not be greater than {{max}}.',
    minChars: 'The field must be at least {{min}} characters.',
    minValue: 'The field must be at least {{min}}.',
    missing: 'The value is not supported.',
    number: 'The field must be a number.',
    numeric: 'The field must be a number.',
    required: 'The field is required.',
    reset: 'Reset',
    string: 'The field must be a string.',
    submit: 'Submit'
  }
} satisfies Resource

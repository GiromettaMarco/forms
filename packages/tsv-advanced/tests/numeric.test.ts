import { NumericRule, Schema } from '@/index'
import { expect, test } from 'vitest'

test('numeric rule', () => {
  const schema = new Schema({
    numeric: new NumericRule(),
    anyNumeric: new NumericRule({
      integer: false
    })
  })

  expect(
    schema.validate({
      numeric: '5',
      anyNumeric: '5.5'
    }).success
  ).toBe(true)

  const result = schema.validate({
    numeric: '5.5',
    anyNumeric: 5
  })

  expect(result.success).toBe(false)
  expect(result.errors?.numeric.text).toBe('integer')
  expect(result.errors?.anyNumeric.text).toBe('string')
})

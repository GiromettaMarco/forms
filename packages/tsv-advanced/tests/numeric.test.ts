import { NumericRule, Schema } from '@/index'
import { expect, test } from 'vite-plus/test'

test('numeric rule', () => {
  const schema = new Schema({
    anyNumeric: new NumericRule({
      integer: false
    }),
    numeric: new NumericRule()
  })

  expect(
    schema.validate({
      anyNumeric: '5.5',
      numeric: '5'
    }).success
  ).toBe(true)

  const result = schema.validate({
    anyNumeric: 5,
    numeric: '5.5'
  })

  expect(result.success).toBe(false)
  expect(result.errors?.numeric.text).toBe('integer')
  expect(result.errors?.anyNumeric.text).toBe('string')
})

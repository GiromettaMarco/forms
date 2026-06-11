import { NumberRule, Schema } from '@/index'
import { expect, test } from 'vitest'

test('array rule', () => {
  const schema = new Schema({
    number: new NumberRule(),
    integer: new NumberRule({
      integer: true
    }),
    parsedInteger: new NumberRule({
      integer: true,
      parseInt: true
    })
  })

  expect(
    schema.validate({
      number: 5,
      integer: 5,
      parsedInteger: 5.5
    }).success
  ).toBe(true)

  const result = schema.validate({
    number: 'A',
    integer: 5.5,
    parsedInteger: 'B'
  })

  expect(result.success).toBe(false)
  expect(result.errors?.number.text).toBe('number')
  expect(result.errors?.integer.text).toBe('integer')
  expect(result.errors?.parsedInteger.text).toBe('number')
})

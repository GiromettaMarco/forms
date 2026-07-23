import { expect, test } from 'vite-plus/test'
import { NumberRule, Schema } from '@/index'

test('array rule', () => {
  const schema = new Schema({
    integer: new NumberRule({
      integer: true
    }),
    number: new NumberRule({
      parseNumber: true
    }),
    parsedInteger: new NumberRule({
      integer: true,
      parseInt: true
    })
  })

  expect(
    schema.validate({
      integer: 5,
      number: '5',
      parsedInteger: 5.5
    }).success
  ).toBe(true)

  const result = schema.validate({
    integer: 5.5,
    number: 'A',
    parsedInteger: 'B'
  })

  expect(result.success).toBe(false)
  expect(result.errors?.number.text).toBe('number')
  expect(result.errors?.integer.text).toBe('integer')
  expect(result.errors?.parsedInteger.text).toBe('number')
})

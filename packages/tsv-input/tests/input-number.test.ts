import { InputNumberRule, Schema } from '@/index'
import { expect, test } from 'vitest'

test('input number rule', () => {
  const schema = new Schema({
    integer: new InputNumberRule({ integer: true }),
    number: new InputNumberRule({
      maxValue: 10,
      minValue: 0
    })
  })

  const result1 = schema.validate({
    integer: '5',
    number: '6'
  })
  expect(result1.success).toBe(true)

  const result2 = schema.validate({
    integer: '0.5',
    number: '11'
  })
  expect(result2.success).toBe(false)
  expect(result2.errors?.integer.text).toBe('integer')
  expect(result2.errors?.number.text).toBe('maxValue')
  expect(result2.errors?.number.params?.max).toBe(10)
  expect(result2.errors?.number.params?.value).toBe(11)

  const result3 = schema.validate({
    integer: '',
    number: '-1'
  })
  expect(result3.success).toBe(false)
  expect(result3.errors?.integer.text).toBe('required')
  expect(result3.errors?.number.text).toBe('minValue')
  expect(result3.errors?.number.params?.min).toBe(0)
  expect(result3.errors?.number.params?.value).toBe(-1)

  const result4 = schema.validate({
    integer: 'abc',
    number: '5.c'
  })
  expect(result4.success).toBe(false)
  expect(result4.errors?.integer.text).toBe('number')
  expect(result4.errors?.number.text).toBe('number')
})

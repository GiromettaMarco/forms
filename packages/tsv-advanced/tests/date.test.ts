import { expect, test } from 'vite-plus/test'
import { DateRule, Schema } from '@/index'

test('date rule', () => {
  const schema = new Schema({
    date: new DateRule()
  })

  expect(
    schema.validate({
      date: 'December 17, 1995 03:24:00'
    }).success
  ).toBe(true)

  const result = schema.validate({
    date: 'today'
  })

  expect(result.success).toBe(false)
  expect(result.errors?.date.text).toBe('date')
})

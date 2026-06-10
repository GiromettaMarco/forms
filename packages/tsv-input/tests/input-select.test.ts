import { InputSelectRule, Schema } from '@/index'
import { expect, test } from 'vitest'

test('input select rule', () => {
  const schema = new Schema({
    select: new InputSelectRule({ options: ['foo', 'bar'] })
  })

  expect(schema.validate({ select: 'foo' }).success).toBe(true)

  const result1 = schema.validate({ select: '' })
  expect(result1.success).toBe(false)
  expect(result1.errors?.select.text).toBe('required')

  const result2 = schema.validate({ select: 'John' })
  expect(result2.success).toBe(false)
  expect(result2.errors?.select.text).toBe('missing')
})

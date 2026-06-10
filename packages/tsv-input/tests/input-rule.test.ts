import { InputRule, Schema } from '@/index'
import { expect, test } from 'vitest'

test('input rule', () => {
  const schema1 = new Schema({
    input: new InputRule()
  })

  expect(schema1.validate({ input: 'John' }).success).toBe(true)

  const result1 = schema1.validate({ input: '' })
  expect(result1.success).toBe(false)
  expect(result1.errors?.input.text).toBe('required')

  const schema2 = new Schema({
    input: new InputRule({ optional: true })
  })

  expect(schema2.validate({ input: '' }).success).toBe(true)
})

import { expect, test } from 'vite-plus/test'
import { BoolRule, Schema } from '@/index'

test('bool rule', () => {
  const schema = new Schema({
    bool: new BoolRule()
  })

  const result = schema.validate({ bool: '' })

  expect(result.success).toBe(true)
  expect(result.sanitized?.bool).toBe(false)
})

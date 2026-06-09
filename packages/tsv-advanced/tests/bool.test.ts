import { BoolRule } from '@/index'
import { Schema } from '@gmcode/tsv-core'
import { expect, test } from 'vitest'

test('bool rule', () => {
  const schema = new Schema({
    bool: new BoolRule()
  })

  const result = schema.validate({ bool: '' })

  expect(result.success).toBe(true)
  expect(result.sanitized?.bool).toBe(false)
})

import { ArrayRule } from '@/index'
import { Schema } from '@gmcode/tsv-core'
import { expect, test } from 'vitest'

test('array rule', () => {
  const schema = new Schema({
    array: new ArrayRule()
  })

  expect(schema.validate({ array: [1, 2, 3] }).success).toBe(true)

  expect(schema.validate({ array: '1, 2, 3' }).success).toBe(true)

  const result = schema.validate({ array: 123 })

  expect(result.success).toBe(false)
  expect(result.errors?.array.text).toBe('array')
})

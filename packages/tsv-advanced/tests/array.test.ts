import { ArrayRule, Schema } from '@/index'
import { expect, test } from 'vite-plus/test'

test('array rule', () => {
  const schema = new Schema({
    array: new ArrayRule(),
    split: new ArrayRule<string>({ splitStringBy: ',' })
  })

  expect(
    schema.validate({
      array: [1, 2, 3],
      split: '1, 2, 3'
    }).success
  ).toBe(true)

  const result = schema.validate({
    array: '1, 2, 3',
    split: 123
  })

  expect(result.success).toBe(false)
  expect(result.errors?.array.text).toBe('array')
  expect(result.errors?.split.text).toBe('array')
})

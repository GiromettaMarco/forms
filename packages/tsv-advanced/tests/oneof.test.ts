import { expect, test } from 'vite-plus/test'
import { OneOfRule, Schema } from '@/index'

test('one of rule', () => {
  const schema = new Schema({
    oneof: new OneOfRule(['A', 'B', 'C'])
  })

  expect(
    schema.validate({
      oneof: 'A'
    }).success
  ).toBe(true)

  const result = schema.validate({
    oneof: 5
  })

  expect(result.success).toBe(false)
  expect(result.errors?.oneof.text).toBe('missing')
})

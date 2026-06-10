import { InputColorRule, Schema } from '@/index'
import { expect, test } from 'vitest'

test('input color rule', () => {
  const schema = new Schema({
    color: new InputColorRule()
  })

  expect(schema.validate({ color: '#fFf' }).success).toBe(true)
  expect(schema.validate({ color: '#fffFFf' }).success).toBe(true)

  const result1 = schema.validate({ color: '' })
  expect(result1.success).toBe(false)
  expect(result1.errors?.color.text).toBe('required')

  const result2 = schema.validate({ color: '#ff' })
  expect(result2.success).toBe(false)
  expect(result2.errors?.color.text).toBe('color')

  const result3 = schema.validate({ color: 'fff' })
  expect(result3.success).toBe(false)
  expect(result3.errors?.color.text).toBe('color')

  const result4 = schema.validate({ color: '#ffffff00' })
  expect(result4.success).toBe(false)
  expect(result4.errors?.color.text).toBe('color')
})

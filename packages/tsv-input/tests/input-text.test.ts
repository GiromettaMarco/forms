import { InputTextRule, Schema } from '@/index'
import { expect, test } from 'vite-plus/test'

test('input text rule', () => {
  const schema = new Schema({
    name: new InputTextRule({
      maxChars: 7,
      minChars: 5
    })
  })

  const result1 = schema.validate({ name: 'Smith' })
  expect(result1.success).toBe(true)

  const result2 = schema.validate({ name: '' })
  expect(result2.success).toBe(false)
  expect(result2.errors?.name.text).toBe('required')

  const result3 = schema.validate({ name: 'Jonathan' })
  expect(result3.success).toBe(false)
  expect(result3.errors?.name.text).toBe('maxChars')
  expect(result3.errors?.name.params?.length).toBe(8)
  expect(result3.errors?.name.params?.max).toBe(7)

  const result4 = schema.validate({ name: 'John' })
  expect(result4.success).toBe(false)
  expect(result4.errors?.name.text).toBe('minChars')
  expect(result4.errors?.name.params?.length).toBe(4)
  expect(result4.errors?.name.params?.min).toBe(5)
})

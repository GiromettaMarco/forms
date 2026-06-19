import { InputEmailRule, Schema } from '@/index'
import { expect, test } from 'vite-plus/test'

test('input email rule', () => {
  const schema = new Schema({
    email: new InputEmailRule({ maxChars: 20 })
  })

  expect(schema.validate({ email: 'john@example.com' }).success).toBe(true)

  const result1 = schema.validate({ email: 'John' })
  expect(result1.success).toBe(false)
  expect(result1.errors?.email.text).toBe('email')

  const result2 = schema.validate({ email: '' })
  expect(result2.success).toBe(false)
  expect(result2.errors?.email.text).toBe('required')

  const result3 = schema.validate({ email: 'johnathan@example.com' })
  expect(result3.success).toBe(false)
  expect(result3.errors?.email.text).toBe('maxChars')
  expect(result3.errors?.email.params?.length).toBe(21)
  expect(result3.errors?.email.params?.max).toBe(20)
})

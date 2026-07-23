import { expect, test } from 'vite-plus/test'
import { EmailRule, Schema } from '@/index'

test('email rule', () => {
  const schema = new Schema({
    email: new EmailRule()
  })

  expect(
    schema.validate({
      email: 'john@example.com'
    }).success
  ).toBe(true)

  const result = schema.validate({
    email: 'john.example.com'
  })

  expect(result.success).toBe(false)
  expect(result.errors?.email.text).toBe('email')
})

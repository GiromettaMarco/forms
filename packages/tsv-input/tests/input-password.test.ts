import { expect, test } from 'vite-plus/test'
import { InputPasswordRule, Schema } from '@/index'

test('input password rule', () => {
  const schema = new Schema({
    password: new InputPasswordRule({ maxChars: 20 })
  })

  const result1 = schema.validate({ password: 'longPassword1!' })
  expect(result1.success).toBe(true)

  const result2 = schema.validate({ password: 'longPassword1' })
  expect(result2.success).toBe(false)
  expect(result2.errors?.password.text).toBe('hasSymbol')

  const result3 = schema.validate({ password: 'longPassword' })
  expect(result3.success).toBe(false)
  expect(result3.errors?.password.text).toBe('hasNumber')

  const result4 = schema.validate({ password: 'longpassword' })
  expect(result4.success).toBe(false)
  expect(result4.errors?.password.text).toBe('hasMixed')

  const result5 = schema.validate({ password: 'Password1!' })
  expect(result5.success).toBe(false)
  expect(result5.errors?.password.text).toBe('minChars')
  expect(result5.errors?.password.params?.length).toBe(10)
  expect(result5.errors?.password.params?.min).toBe(12)

  const result6 = schema.validate({ password: '' })
  expect(result6.success).toBe(false)
  expect(result6.errors?.password.text).toBe('required')

  const result7 = schema.validate({ password: 'Very_Long_Password_1_!' })
  expect(result7.success).toBe(false)
  expect(result7.errors?.password.text).toBe('maxChars')
  expect(result7.errors?.password.params?.length).toBe(22)
  expect(result7.errors?.password.params?.max).toBe(20)
})

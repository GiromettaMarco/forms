import { expect, test } from 'vite-plus/test'
import { InputCheckboxRule, Schema } from '@/index'

test('input text rule', () => {
  const schema = new Schema({
    default: new InputCheckboxRule(),
    mandatory: new InputCheckboxRule({ optional: false })
  })

  const result1 = schema.validate({
    default: 'value',
    mandatory: 'value'
  })
  expect(result1.success).toBe(true)

  const result2 = schema.validate({
    default: '',
    mandatory: ''
  })
  expect(result2.success).toBe(false)
  expect(result2.errors?.mandatory.text).toBe('required')
})

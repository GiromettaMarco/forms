import { Schema, TextRule } from '@/index'
import { expect, test } from 'vite-plus/test'

test('text rule', () => {
  const schema = new Schema({
    parsedText: new TextRule({
      parseNumber: true
    }),
    text: new TextRule()
  })

  expect(
    schema.validate({
      parsedText: 5,
      text: 'John'
    }).success
  ).toBe(true)

  const result = schema.validate({
    parsedText: true,
    text: 5
  })

  expect(result.success).toBe(false)
  expect(result.errors?.text.text).toBe('string')
  expect(result.errors?.parsedText.text).toBe('string')
})

import { Schema, TextRule } from '@/index'
import { expect, test } from 'vitest'

test('text rule', () => {
  const schema = new Schema({
    text: new TextRule(),
    parsedText: new TextRule({
      parseNumber: true
    })
  })

  expect(
    schema.validate({
      text: 'John',
      parsedText: 5
    }).success
  ).toBe(true)

  const result = schema.validate({
    text: 5,
    parsedText: true
  })

  expect(result.success).toBe(false)
  expect(result.errors?.text.text).toBe('string')
  expect(result.errors?.parsedText.text).toBe('string')
})

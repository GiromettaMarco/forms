import { BasicRule, Message, Schema } from '@/index'
import { expect, test } from 'vitest'

class FooRule extends BasicRule {
  test(value: unknown): true | Message {
    if (value === 'foo') {
      return true
    }

    return new Message('This is not "foo"!')
  }
}

class BarRule extends BasicRule<string> {
  sanitize(value: unknown): string | null {
    return value ? String(value).trim() : null
  }

  test(value: unknown): true | Message {
    if (value === 'bar') {
      return true
    }

    return new Message('This is not "bar"!')
  }
}

test('basic rule', () => {
  const schema1 = new Schema({
    foo: new FooRule()
  })

  const fooResult = schema1.validate({ foo: 'foo' })
  const barResult = schema1.validate({ foo: 'bar' })

  expect(fooResult.success).toBe(true)
  expect(barResult.success).toBe(false)
  expect(barResult.errors?.foo.text).toBe('This is not "foo"!')

  const schema2 = new Schema(
    {
      foo: new FooRule(),
      bar: new BarRule()
    },
    {
      postValidation: [
        {
          addTo: 'foo',
          callback({ foo, bar }) {
            if (foo === bar) {
              return true
            }

            return new Message('"foo" is different from "bar"!')
          }
        }
      ]
    }
  )

  const foobarResult = schema2.validate({ foo: 'foo', bar: 'bar' })

  expect(foobarResult.success).toBe(false)
  expect(foobarResult.errors?.foo.text).toBe('"foo" is different from "bar"!')
})

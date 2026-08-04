import { expect, test } from 'vite-plus/test'
import { BasicRule, Message, Schema } from '@/index'

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
    // oxlint-disable-next-line typescript/no-base-to-string
    return value ? String(value).trim() : null
  }

  test(value: unknown): true | Message {
    if (value === 'bar') {
      return true
    }

    return new Message('This is not "bar"!')
  }
}

const schema1 = new Schema({
  foo: new FooRule()
})

function fooIsBarRule({ bar, foo }: { bar: unknown; foo: unknown }) {
  if (foo === bar) {
    return true
  }

  return new Message('"foo" is different from "bar"!')
}

const schema2 = new Schema(
  {
    bar: new BarRule(),
    foo: new FooRule()
  },
  {
    postValidation: [
      {
        addTo: 'foo',
        callback: fooIsBarRule
      }
    ]
  }
)

const schema3 = new Schema(
  {
    bar: new FooRule(),
    foo: new FooRule()
  },
  {
    postValidation: [
      {
        addTo: 'foo',
        callback: fooIsBarRule
      }
    ]
  }
)

test('Schema with BasicRule', () => {
  const fooResult = schema1.validate({ foo: 'foo' })
  const barResult = schema1.validate({ foo: 'bar' })

  expect(fooResult.success).toBe(true)
  expect(barResult.success).toBe(false)
  expect(barResult.errors?.foo.text).toBe('This is not "foo"!')
})

test('Schema with postValidation', () => {
  const foobarResult = schema2.validate({ bar: 'bar', foo: 'foo' })

  expect(foobarResult.success).toBe(false)
  expect(foobarResult.errors?.foo.text).toBe('"foo" is different from "bar"!')

  const fooFooResult = schema3.validate({ bar: 'foo', foo: 'foo' })

  expect(fooFooResult.success).toBe(true)
})

test('using FormData', () => {
  const formData = new FormData()
  formData.append('foo', 'foo')
  const formDataResult = schema1.validate(formData)

  expect(formDataResult.success).toBe(true)
})

# @gmcode/tsv-input

[![coverage](docs/coverage.svg)](https://github.com/GiromettaMarco/forms/actions.yml)
[![npm](https://img.shields.io/npm/v/@gmcode/tsv-input)](https://npm.im/@gmcode/tsv-input)

Typescript schema validations for form inputs with i18n interpolation support.

## Installation

```
npm install @gmcode/tsv-input
```

## Usage

```ts
import { InputEmailRule, InputTextRule, Schema } from '@gmcode/tsv-input'

// Define the schema
const schema = new Schema({
  name: new InputTextRule({
    maxChars: 30,
    minChars: 5
  }),
  email: new InputEmailRule({
    maxChars: 120
  })
})

// Validate some values
const result = schema.validate({
  name: 'John',
  email: 'john@example.com'
})

if (result.success) {
  // The input is valid
  // ...
} else {
  // Handle rejection
  // ...
}
```

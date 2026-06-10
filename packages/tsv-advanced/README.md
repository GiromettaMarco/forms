# @gmcode/tsv-advanced

[![coverage](docs/coverage.svg)](https://github.com/GiromettaMarco/forms/actions.yml)
[![npm](https://img.shields.io/npm/v/@gmcode/tsv-advanced)](https://npm.im/@gmcode/tsv-advanced)

Typescript schema validations with type conversion and i18n interpolation support.

## Installation

```
npm install @gmcode/tsv-advanced
```

## Usage

```ts
import { DateRule, IntegerRule, Schema } from '@gmcode/tsv-advanced'

// Define the schema
const schema = new Schema({
  date: new DateRule(),
  integer: new IntegerRule({
    maxValue: 10,
    minValue: 0
  })
})

// Validate some values
const result = schema.validate({
  date: 'December 17, 1995 03:24:00',
  integer: '6'
})

if (result.success) {
  // The input is valid

  // Converted and typed as Date object
  result.sanitized.date

  // Converted and typed as number
  result.sanitized.integer
} else {
  // Handle rejection
  // ...
}
```

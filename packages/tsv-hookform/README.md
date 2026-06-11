# @gmcode/tsv-hookform

[![coverage](https://github.com/GiromettaMarco/forms/tree/master/packages/tsv-hookform/docs/coverage.svg)](https://github.com/GiromettaMarco/forms/actions.yml)
[![npm](https://img.shields.io/npm/v/@gmcode/tsv-hookform)](https://npm.im/@gmcode/tsv-hookform)

Custom react-hook-form resolver for [`@gmcode/tsv-input`](https://github.com/GiromettaMarco/forms/tree/master/packages/tsv-input).

## Installation

```
npm install @gmcode/tsv-hookform
```

## Usage

```tsx
import { useTsvResolver } from '@gmcode/tsv-hookform'
import { InputRule, Schema } from '@gmcode/tsv-input'
import { useForm } from 'react-hook-form'

// Schema definition
const schema = new Schema({
  foo: new InputRule()
})

// Form component
export function Form() {
  // Hook & Resolver
  const { control, formState } = useForm({
    resolver: useTsvResolver(schema)
  })

  // ...
}
```

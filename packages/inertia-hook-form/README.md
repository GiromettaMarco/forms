# @gmcode/inertia-hook-form

[![npm](https://img.shields.io/npm/v/@gmcode/inertia-hook-form)](https://npm.im/@gmcode/inertia-hook-form)

This module provides a `useForm` react hook which combines the inertia useForm hook with react-hook-form for client-side validations.

## Installation

```
npm install @gmcode/inertia-hook-form
```

## Usage

### Validation schema

```ts
// schema.ts
import { InputTextRule, Schema } from '@gmcode/inertia-hook-form/tsv'

export const schema = new Schema({
  query: new InputTextRule({
    maxChars: 255,
    messages: {
      // ...
    },
    minChars: 3,
    optional: false
  })
})
```

### Form route

```ts
// route.ts
export const route = {
  method: 'post' as const,
  url: 'search'
}
```

### React hook and render

```tsx
// page.tsx
import { useForm } from '@gmcode/inertia-hook-form'
import { Controller } from 'react-hook-form'
import { route } from './route.ts'
import { schema } from './schema.ts'

export function Page() {
  const { errors, form, loading, onSubmit } = useForm({
    defaults: {
      query: ''
    },
    route, // works out of the box with laravel wayfinder
    schema
  })

  return (
    <form
      action={route.url}
      method={route.method}
      onSubmit={onSubmit}
    >
      <Controller
        control={form.control}
        name="query"
        render={({ field, fieldState }) => (
          <>
            <input {...field} />
            {/* Field level error object with parameters for i18n interpolation */}
            <p>{fieldState.error?.message}</p>
          </>
        )}
      />

      <button
        disabled={loading}
        type="submit"
      >
        Submit
      </button>

      {/* Root level error */}
      <p>{errors.root}</p>
    </form>
  )
}
```

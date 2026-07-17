# @gmcode/forms

Form and input components with validations, i18n, tailwind theming and built-in inertia form.

## Requirements

- React and react-dom 19+
- Inertia React 3+
- Tailwind CSS 4+
- i18next (26+) and react-i18next (17+)

## Installation

```
npm install @gmcode/forms
```

## i18n setup

```ts
import { i18n as formsI18n } from '@gmcode/forms'
import { it } from '@gmcode/forms/locales'

// App i18n
i18n.use(initReactI18next).init({})

// Add a locale
formsI18n.addResourceBundle('it', 'translation', it, true)

// Set the initial language
formsI18n.changeLanguage(i18n.language)

// Keep language synched
i18n.on('languageChanged', (language) => formsI18n.changeLanguage(language))
```

## Tailwind setup

```css
/* app.css */
@source '../path/to/node_modules/@gmcode/forms';
@source '../path/to/node_modules/@gmcode/react-ui';
```

## Usage

```tsx
import { Form, InputTextRule, Schema, Submit, TextField } from '@gmcode/forms'

const schema = new Schema({
  username: new InputTextRule({
    maxChars: 20,
    minChars: 4
  })
})

function Page() {
  return (
    <Form
      defaults={{ username: '' }}
      schema={schema}
      route={{
        method: 'post',
        url: 'https://endpoint'
      }}
    >
      {({ form, loading }) => (
        <>
          <TextField
            control={form.control}
            inputName="username"
            label="Username"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}
```

## CSS themes

- [Default](https://github.com/GiromettaMarco/forms/blob/master/internal/themes/default.css)

## Code Snippet

```json
{
  "Form": {
    "prefix": "form",
    "description": "Form component to manage submission with Inertia and React Hook Form.",
    "scope": "javascriptreact,typescriptreact",
    "body": [
      "<Form$1",
      "  defaults={{$4}}",
      "  route={$2}",
      "  schema={$3}",
      ">",
      "  {({ form, loading }) => (",
      "    <>",
      "      $5",
      "    </>",
      "  )}",
      "</Form>"
    ]
  }
}
```

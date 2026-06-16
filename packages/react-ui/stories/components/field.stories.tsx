import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Input,
  Switch
} from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Field',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Field Set',
  render: () => (
    <FieldSet>
      <FieldLegend>Field example</FieldLegend>
      <FieldDescription>
        This is an example of field and input components.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            autoComplete="off"
            id="name"
            name="name"
            placeholder="John Smith"
          />
          <FieldDescription>This is a field description.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FieldSet>
  <FieldLegend>Field example</FieldLegend>
  <FieldDescription>
    This is an example of field and input components.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full Name</FieldLabel>
      <Input
        autoComplete="off"
        id="name"
        name="name"
        placeholder="John Smith"
      />
      <FieldDescription>This is a field description.</FieldDescription>
    </Field>
  </FieldGroup>
</FieldSet>`
      }
    }
  }
}

export const Error: Story = {
  name: 'Field Error',
  render: () => (
    <FieldSet>
      <FieldLegend>FieldError behavior</FieldLegend>
      <FieldDescription>
        This is how the FieldError component behaves with different types of
        errors.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="unique_id">Unique ID</FieldLabel>
          <Input
            aria-invalid
            autoComplete="off"
            id="unique_id"
            name="unique_id"
          />
          <FieldError>This ID is already taken.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            autoComplete="off"
            id="username"
            name="username"
          />
          <FieldDescription>
            A FieldError component without content doesn't get rendered.
          </FieldDescription>
          <FieldError />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            aria-invalid
            autoComplete="off"
            id="password"
            name="password"
          />
          <FieldError
            errors={[
              { message: 'The password must be at least 8 characters long.' },
              {
                message:
                  'The password must contain numbers, lowercase and uppercase letters.'
              },
              { message: 'The password must be different from the last one.' }
            ]}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password_confirm">Repeat Password</FieldLabel>
          <Input
            aria-invalid
            autoComplete="off"
            id="password_confirm"
            name="password_confirm"
          />
          <FieldError
            errors={[
              { message: 'A repeated error appears only once' },
              { message: 'A repeated error appears only once' }
            ]}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FieldSet>
  <FieldLegend>FieldError behavior</FieldLegend>
  <FieldDescription>
    This is how the FieldError component behaves with different types of
    errors.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="unique_id">Unique ID</FieldLabel>
      <Input
        aria-invalid
        autoComplete="off"
        id="unique_id"
        name="unique_id"
      />
      <FieldError>This ID is already taken.</FieldError>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input
        autoComplete="off"
        id="username"
        name="username"
      />
      <FieldDescription>
        A FieldError component without content doesn't get rendered.
      </FieldDescription>
      <FieldError />
    </Field>
    <Field>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input
        aria-invalid
        autoComplete="off"
        id="password"
        name="password"
      />
      <FieldError
        errors={[
          { message: 'The password must be at least 8 characters long.' },
          {
            message:
              'The password must contain numbers, lowercase and uppercase letters.'
          },
          { message: 'The password must be different from the last one.' }
        ]}
      />
    </Field>
    <Field>
      <FieldLabel htmlFor="password_confirm">Repeat Password</FieldLabel>
      <Input
        aria-invalid
        autoComplete="off"
        id="password_confirm"
        name="password_confirm"
      />
      <FieldError
        errors={[
          { message: 'A repeated error appears only once' },
          { message: 'A repeated error appears only once' }
        ]}
      />
    </Field>
  </FieldGroup>
</FieldSet>`
      }
    }
  }
}

export const Content: Story = {
  name: 'Field Content',
  render: () => (
    <FieldSet>
      <FieldLegend>FieldContent layout</FieldLegend>
      <FieldDescription>
        Small inputs combined with FieldContent.
      </FieldDescription>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox
            id="checkbox"
            name="checkbox"
          />
          <FieldContent>
            <FieldLabel htmlFor="checkbox">
              Checkbox with description
            </FieldLabel>
            <FieldDescription>
              FieldContent is a flex column that groups label and description.
              Not required if you have no description.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            defaultChecked
            id="checkbox_2"
            name="checkbox_2"
          />
          <FieldContent>
            <FieldTitle>Checkbox with title</FieldTitle>
            <FieldDescription>
              FieldTitle doesn't act as an html label.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <Switch
            id="switch"
            name="switch"
          />
          <FieldLabel htmlFor="switch">Switch with label</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FieldSet>
  <FieldLegend>FieldContent layout</FieldLegend>
  <FieldDescription>
    Small inputs combined with FieldContent.
  </FieldDescription>
  <FieldGroup>
    <Field orientation="horizontal">
      <Checkbox
        id="checkbox"
        name="checkbox"
      />
      <FieldContent>
        <FieldLabel htmlFor="checkbox">
          Checkbox with description
        </FieldLabel>
        <FieldDescription>
          FieldContent is a flex column that groups label and description.
          Not required if you have no description.
        </FieldDescription>
      </FieldContent>
    </Field>
    <Field orientation="horizontal">
      <Checkbox
        defaultChecked
        id="checkbox_2"
        name="checkbox_2"
      />
      <FieldContent>
        <FieldTitle>Checkbox with title</FieldTitle>
        <FieldDescription>
          FieldTitle doesn't act as an html label.
        </FieldDescription>
      </FieldContent>
    </Field>
    <Field orientation="horizontal">
      <Switch
        id="switch"
        name="switch"
      />
      <FieldLabel htmlFor="switch">Switch with label</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>`
      }
    }
  }
}

export const Separator: Story = {
  name: 'Field Separator',
  render: () => (
    <FieldGroup className="w-48 sm:w-96">
      <FieldSet>
        <FieldLegend>First Set</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              autoComplete="off"
              id="name"
              name="name"
              placeholder="John Smith"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend>Second Set</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              autoComplete="off"
              id="username"
              name="username"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator>with children</FieldSeparator>
      <FieldSet>
        <FieldLegend>Third Set</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              autoComplete="off"
              id="password"
              name="password"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}

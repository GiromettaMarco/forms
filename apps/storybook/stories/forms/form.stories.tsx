import { InputTextRule, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  flashSuccessMessage,
  formRoute,
  inertiaResponseError,
  inertiaResponseSuccess
} from '../utility'
import { Form } from '@/forms/form'
import { Submit } from '@/forms/submit'
import { TextField } from '@/forms/text-field'

const schema = new Schema({
  username: new InputTextRule({
    maxChars: 20,
    messages: {
      maxChars: 'username.maxChars',
      minChars: 'username.minChars',
      required: 'username.required'
    },
    minChars: 4
  })
})

const meta = {
  argTypes: {
    className: { control: 'text' },
    defaults: { control: false },
    onBefore: { control: false },
    onBeforeUpdate: { control: false },
    onCancel: { control: false },
    onCancelToken: { control: false },
    onError: { control: false },
    onFinish: { control: false },
    onFlash: { control: false },
    onPrefetched: { control: false },
    onPrefetching: { control: false },
    onProgress: { control: false },
    onStart: { control: false },
    onSuccess: { control: false },
    preserveScroll: { control: 'boolean' },
    resetOnSuccess: { control: 'boolean' },
    rootError: {
      control: 'select',
      options: ['flash', 'monitor', 'none']
    },
    route: { control: false },
    setDefaultsOnSuccess: { control: 'boolean' }
  },
  args: {
    children: ({ form, loading }) => (
      <>
        <TextField
          control={form.control}
          inputName="username"
          label="Username"
        />
        <Submit loading={loading} />
      </>
    ),
    className: 'w-72',
    defaults: { username: '' },
    onSuccess: flashSuccessMessage,
    route: formRoute,
    schema: schema,
    setDefaultsOnSuccess: true
  },
  component: Form,
  parameters: {
    layout: 'centered'
  },
  title: 'Forms/Form'
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Form
  className="w-72"
  defaults={{ username: '' }}
  onSuccess={() => flash({ level: 'success', title: 'Submitted' })}
  route={{ method: 'post', url: 'forms' }}
  schema={new Schema({/* ... */})}
  setDefaultsOnSuccess
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
</Form>`
      }
    },
    msw: {
      handlers: [inertiaResponseSuccess]
    }
  }
}

export const I18n: Story = {
  globals: {
    locale: 'it'
  },
  name: 'i18n',
  parameters: {
    msw: {
      handlers: [inertiaResponseSuccess]
    }
  }
}

export const FlashError: Story = {
  parameters: {
    msw: {
      handlers: [inertiaResponseError]
    }
  }
}

export const InlineError: Story = {
  args: {
    rootError: 'monitor'
  },
  parameters: {
    msw: {
      handlers: [inertiaResponseError]
    }
  }
}

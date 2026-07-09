import { Form, InputTextRule, Schema, Submit, TextField } from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { formRoute, inertiaResponseError, inertiaResponseSuccess } from '../msw'

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

interface Props {
  className?: string
  rootError?: 'flash' | 'monitor' | 'none'
}

const meta = {
  argTypes: {
    className: { control: 'text' },
    rootError: {
      control: 'radio',
      options: ['flash', 'monitor', 'none']
    }
  },
  args: {
    className: 'w-72'
  },
  parameters: {
    layout: 'centered'
  },
  render: (props) => (
    <Form
      defaults={{ username: '' }}
      schema={schema}
      route={formRoute}
      {...props}
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
  ),
  tags: ['autodocs'],
  title: 'Components/Form'
} satisfies Meta<Props>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [inertiaResponseSuccess]
    }
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Username'), 'Jim')
    await userEvent.click(canvas.getByText('Submit'))
    await expect(
      canvas.getByText(
        'Your username must be at least 4 characters. The chosen name is 3 characters long.'
      )
    ).toBeInTheDocument()
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
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Username'), 'Jim')
    await userEvent.click(canvas.getByText('Submit'))
    await expect(
      canvas.getByText(
        'Il tuo nome utente deve essere lungo almeno 4 caratteri. Il nome scelto è lungo 3 caratteri.'
      )
    ).toBeInTheDocument()
  }
}

export const FlashError: Story = {
  parameters: {
    msw: {
      handlers: [inertiaResponseError]
    }
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Username'), 'John')
    await userEvent.click(canvas.getByText('Submit'))
    await waitFor(() =>
      expect(
        canvas.getByText('These credentials do not match our records.')
      ).toBeInTheDocument()
    )
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
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Username'), 'John')
    await userEvent.click(canvas.getByText('Submit'))
    await expect(
      canvas.getByText('These credentials do not match our records.')
    ).toBeInTheDocument()
  }
}

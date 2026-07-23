import { i18n } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { I18nextProvider } from 'react-i18next'
import { Submit } from '@/forms/submit'

const meta = {
  argTypes: {
    asChild: { control: false },
    label: { control: 'text' },
    loading: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg']
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'link',
        'outline',
        'ghost',
        'destructive'
      ]
    }
  },
  component: Submit,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    )
  ],
  parameters: { layout: 'centered' },
  title: 'Forms/Submit'
} satisfies Meta<typeof Submit>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

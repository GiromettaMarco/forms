import type { Meta, StoryObj } from '@storybook/react-vite'
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
  parameters: { layout: 'centered' },
  title: 'Forms/Submit'
} satisfies Meta<typeof Submit>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

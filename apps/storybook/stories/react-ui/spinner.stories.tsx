import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@/react-ui/spinner'

const meta = {
  component: Spinner,
  parameters: { layout: 'centered' },
  title: 'React UI/Spinner'
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

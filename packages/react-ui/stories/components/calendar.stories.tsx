import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from '@/components/calendar'
import { it } from 'date-fns/locale'

const meta = {
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Calendar'
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-72 rounded-md border',
    fixedWeeks: true,
    mode: 'single'
  }
}

export const Italian: Story = {
  args: {
    className: 'w-72 rounded-md border',
    fixedWeeks: true,
    locale: it,
    mode: 'single'
  }
}

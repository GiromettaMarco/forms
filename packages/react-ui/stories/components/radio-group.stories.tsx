import { Label, RadioGroup, RadioGroupItem } from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: RadioGroup,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  title: 'Components/Radio Group'
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-fit',
    defaultValue: 'auto'
  },
  render: (props) => (
    <RadioGroup {...props}>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="auto"
          value="auto"
        />
        <Label htmlFor="auto">Auto</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="light"
          value="light"
        />
        <Label htmlFor="light">Light</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="dark"
          value="dark"
        />
        <Label htmlFor="dark">Dark</Label>
      </div>
    </RadioGroup>
  )
}

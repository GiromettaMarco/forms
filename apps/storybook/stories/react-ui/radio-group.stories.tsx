import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/react-ui/radio-group'
import { Label } from '@/react-ui/label'

const meta = {
  argTypes: {
    asChild: { control: false }
  },
  component: RadioGroup,
  parameters: {
    layout: 'centered'
  },
  subcomponents: { RadioGroupItem },
  title: 'React UI/Radio Group'
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

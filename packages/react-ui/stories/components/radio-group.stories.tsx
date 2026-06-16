import { Label, RadioGroup, RadioGroupItem } from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Radio Group',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup
      className="w-fit"
      defaultValue="auto"
    >
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
  ),
  parameters: {
    docs: {
      source: {
        code: `<RadioGroup
  className="w-fit"
  defaultValue="auto"
>
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
</RadioGroup>`
      }
    }
  }
}

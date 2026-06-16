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
      defaultValue="auto"
      className="w-fit"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem
          value="auto"
          id="auto"
        />
        <Label htmlFor="auto">Auto</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          value="light"
          id="light"
        />
        <Label htmlFor="light">Light</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          value="dark"
          id="dark"
        />
        <Label htmlFor="dark">Dark</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<RadioGroup
  defaultValue="auto"
  className="w-fit"
>
  <div className="flex items-center gap-3">
    <RadioGroupItem
      value="auto"
      id="auto"
    />
    <Label htmlFor="auto">Auto</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem
      value="light"
      id="light"
    />
    <Label htmlFor="light">Light</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem
      value="dark"
      id="dark"
    />
    <Label htmlFor="dark">Dark</Label>
  </div>
</RadioGroup>`
      }
    }
  }
}

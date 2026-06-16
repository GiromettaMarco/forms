import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  TextareaAutosize
} from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Textarea Autoresize',
  component: TextareaAutosize,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    placeholder: 'Autoresize textarea...'
  }
} satisfies Meta<typeof TextareaAutosize>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Invalid: Story = {
  args: {
    'aria-invalid': true
  }
}

export const Group: Story = {
  name: 'Input Group',
  render: () => (
    <InputGroup>
      <TextareaAutosize
        aria-label="textarea autosize"
        className="border-none shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent"
        data-slot="input-group-control"
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          className="ml-auto"
          size="sm"
          variant="default"
        >
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup>
  <TextareaAutosize
    aria-label="textarea autosize"
    className="border-none shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent"
    data-slot="input-group-control"
  />
  <InputGroupAddon align="block-end">
    <InputGroupButton
      className="ml-auto"
      size="sm"
      variant="default"
    >
      Submit
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`
      }
    }
  }
}

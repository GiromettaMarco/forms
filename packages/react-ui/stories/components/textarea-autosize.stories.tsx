import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  TextareaAutosize
} from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {
    placeholder: 'Autoresize textarea...'
  },
  component: TextareaAutosize,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Textarea Autoresize'
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
  },
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
  )
}

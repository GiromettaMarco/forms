import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from '@/react-ui/input-group'
import { TextareaAutosize } from '@/react-ui/textarea-autosize'

const meta = {
  args: {
    className: 'min-w-72',
    placeholder: 'Try typing multiple lines...'
  },
  argTypes: {
    'aria-invalid': { control: 'boolean' }
  },
  component: TextareaAutosize,
  parameters: { layout: 'centered' },
  title: 'React UI/Textarea Autosize'
} satisfies Meta<typeof TextareaAutosize>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Group: Story = {
  args: {
    className:
      'min-w-72 border-none shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent',
    'data-slot': 'input-group-control'
  },
  name: 'Input Group',
  render: (props) => (
    <InputGroup>
      <TextareaAutosize {...props} />
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

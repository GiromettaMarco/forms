import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar } from '@/react-ui/calendar'
import { it } from 'date-fns/locale'

const meta = {
  argTypes: {
    buttonVariant: {
      control: 'select',
      options: [
        'link',
        'default',
        'destructive',
        'ghost',
        'outline',
        'secondary'
      ]
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years']
    },
    disableNavigation: { control: 'boolean' },
    disabled: { control: 'object' },
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range']
    },
    showOutsideDays: { control: 'boolean' }
  },
  args: {
    className: 'w-72 rounded-md border',
    fixedWeeks: true,
    mode: 'single'
  },
  component: Calendar,
  parameters: { layout: 'centered' },
  title: 'React UI/Calendar'
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Italian: Story = {
  args: {
    locale: it
  },
  parameters: {
    docs: {
      source: {
        code: `import { it } from 'date-fns/locale'

<Calendar
  className="w-72 rounded-md border"
  fixedWeeks
  locale={it}
  mode="single"
/>`
      }
    }
  }
}

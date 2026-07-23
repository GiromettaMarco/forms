import { Toaster } from '@gmcode/react-ui'
import type { StoryContext } from '@storybook/react-vite'
import type { PartialStoryFn } from 'storybook/internal/csf'

/**
 * Add a Toaster component to display flash messages.
 */
export function WithToaster(Story: PartialStoryFn, context: StoryContext) {
  if (context.parameters.disableToaster) {
    return <Story />
  }

  const { theme } = context.globals

  return (
    <>
      <Toaster
        closeButton={true}
        position="bottom-center"
        theme={theme || 'system'}
      />
      <Story />
    </>
  )
}

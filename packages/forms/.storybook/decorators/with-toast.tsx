import type { PartialStoryFn } from 'storybook/internal/csf'
import type { StoryContext } from '@storybook/react-vite'
import { Toaster } from '@gmcode/react-ui'

/**
 * Add a Toast component to display flash messages.
 */
export const WithToast = (Story: PartialStoryFn, context: StoryContext) => {
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

import { setupWorker, type SetupWorker } from 'msw/browser'
import { test as testBase } from 'vite-plus/test'

const worker = setupWorker()

/** Keep track of the state of the worker */
let started = false

/**
 * Vitest test function extended with msw browser worker.
 *
 * @see https://mswjs.io/docs/recipes/vitest-browser-mode/
 */
export const test = testBase.extend<{ worker: SetupWorker }>({
  worker: [
    // oxlint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // We remove handlers at the start instead of the end of the test, so we
      // can keep working with handlers even in UI mode.
      worker.resetHandlers()

      // Start the worker if not already.
      if (!started) {
        await worker.start({ onUnhandledRequest: 'error', quiet: true })
        started = true
      }

      // Expose the worker object on the test's context.
      await use(worker)

      // We purposely omit stopping the worker.
      // @see https://mswjs.io/docs/recipes/vitest-browser-mode#example
    },
    {
      auto: true
    }
  ]
})

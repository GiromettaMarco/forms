import { setupWorker, type SetupWorker } from 'msw/browser'
import { test as testBase } from 'vite-plus/test'

const worker = setupWorker()

/**
 * Vitest test function extended with msw browser worker.
 *
 * @see https://mswjs.io/docs/recipes/vitest-browser-mode/
 */
export const test = testBase.extend<{ worker: SetupWorker }>({
  worker: [
    // oxlint-disable-next-line no-empty-pattern
    async ({}, use) => {
      // Start the worker before the test.
      await worker.start({ onUnhandledRequest: 'error', quiet: true })

      // Expose the worker object on the test's context.
      await use(worker)

      // Remove any request handlers added in individual test cases.
      // This prevents them from affecting unrelated tests.
      worker.resetHandlers()

      // Stop the worker to avoid '[MSW] Found a redundant "worker.start()"
      // call.' warning on the next test start.
      worker.stop()
    },
    {
      auto: true
    }
  ]
})

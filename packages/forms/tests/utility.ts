import {
  HttpResponse,
  type HttpResponseInit,
  type JsonBodyType,
  http
} from 'msw'
import { type SetupWorker, setupWorker } from 'msw/browser'
import type { ReactNode } from 'react'
import { test as testBase } from 'vite-plus/test'
import { type RenderOptions, render as renderBase } from 'vitest-browser-react'
import { Wrapper } from './wrapper'

//#region MSW
export const formRoute = {
  method: 'post' as const,
  url: 'forms'
}

function getResponseBody(props: object = {}): JsonBodyType {
  return {
    component: 'forms',
    flash: {},
    props,
    sharedProps: [],
    url: '/',
    version: '0'
  }
}

function getResponseInit(status: number = 200): HttpResponseInit {
  return {
    headers: {
      'Content-Type': 'application/json',
      Vary: 'X-Inertia',
      'X-Inertia': 'true'
    },
    status
  }
}

export const inertiaResponseSuccess = http.post('/forms', () => {
  return HttpResponse.json(getResponseBody(), getResponseInit())
})

export const inertiaResponseError = http.post('/forms', () => {
  return HttpResponse.json(
    getResponseBody({
      errors: {
        root: 'These credentials do not match our records.'
      }
    }),
    getResponseInit()
  )
})

export const worker = setupWorker()

//#region Fixtures
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

/**
 * Render function extended with default wrapper.
 */
export function render(content: ReactNode, options?: RenderOptions) {
  return renderBase(content, { wrapper: Wrapper, ...options })
}

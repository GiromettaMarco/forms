import {
  HttpResponse,
  type HttpResponseInit,
  type JsonBodyType,
  http
} from 'msw'

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

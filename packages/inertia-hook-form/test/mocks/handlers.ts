import {
  HttpResponse,
  type HttpResponseInit,
  type JsonBodyType,
  http
} from 'msw'

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

export const inertiaResponseRootError = http.post('/forms', () => {
  return HttpResponse.json(
    getResponseBody({
      errors: {
        root: 'These credentials do not match our records.'
      }
    }),
    getResponseInit()
  )
})

export const inertiaResponseFiledError = http.post('/forms', () => {
  return HttpResponse.json(
    getResponseBody({
      errors: {
        name: 'This username is already in taken.'
      }
    }),
    getResponseInit()
  )
})

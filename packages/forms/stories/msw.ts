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

export const responseData: JsonBodyType = {
  component: 'forms',
  flash: {},
  props: {},
  sharedProps: [],
  url: '/',
  version: '0'
}

export const init: HttpResponseInit = {
  headers: {
    'Content-Type': 'application/json',
    Vary: 'X-Inertia',
    'X-Inertia': 'true'
  },
  status: 200
}

export const handler200 = http.post('/forms', () => {
  return HttpResponse.json(responseData, init)
})

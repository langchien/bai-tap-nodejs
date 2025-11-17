import { envConfig } from '@/config/envConfig'
import {
  AppException,
  REQ_METHOD,
  STATUS_CODE,
  UnprocessableEntityException,
  type CustomRequestInit,
} from './request.const'

const DEFAULT_HEADER_CONTENT_TYPE = 'Content-Type'
const DEFAULT_CONTENT_TYPE_JSON = 'application/json'
const DEFAULT_HEADER_CONTENT_TYPE_LOWER = 'content-type'
const DEFAULT_ERROR_MESSAGE = 'Lỗi không xác định'
const DEFAULT_SLASH = '/'

/**
 * @param method REQ_METHOD
 * @param url string
 * @param option CustomRequestInit
 */
export const handleRequest = async <T>(
  method: REQ_METHOD,
  url: string,
  option?: CustomRequestInit,
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined
  const baseHeaders = {
    [DEFAULT_HEADER_CONTENT_TYPE]: DEFAULT_CONTENT_TYPE_JSON,
  }
  const envBaseUrl = envConfig.apiBaseUrl
  const baseUrl = option?.baseUrl ?? envBaseUrl
  // Normalize to avoid duplicate or missing slashes
  const normalizedBase = baseUrl.replace(/\/+$/, '')
  const normalizedPath = url.startsWith(DEFAULT_SLASH) ? url : `${DEFAULT_SLASH}${url}`
  const fullUrl = `${normalizedBase}${normalizedPath}`
  const res = await fetch(fullUrl, {
    ...option,
    method,
    body,
    headers: {
      ...baseHeaders,
      ...option?.headers,
    },
  })

  if (res.status === STATUS_CODE.NO_CONTENT) {
    return null as T
  }

  const contentType = res.headers.get(DEFAULT_HEADER_CONTENT_TYPE_LOWER)
  let payload: any = null
  if (contentType && contentType.includes(DEFAULT_CONTENT_TYPE_JSON)) {
    payload = await res.json()
  }

  if (res.ok) {
    return payload as T
  }
  // Có thể mở rộng thêm các lỗi khác ở đây, hiện tại chỉ cần xử lý 422 và các lỗi còn lại
  switch (res.status) {
    case STATUS_CODE.UNPROCESSABLE_ENTITY: {
      throw new UnprocessableEntityException(payload)
    }
    default: {
      throw new AppException({
        message: payload?.message ?? DEFAULT_ERROR_MESSAGE,
        statusCode: res.status,
      })
    }
  }
}

export const httpRequest = {
  get: <T>(url: string, option?: CustomRequestInit) =>
    handleRequest<T>(REQ_METHOD.GET, url, option),
  post: <T>(url: string, option?: CustomRequestInit) =>
    handleRequest<T>(REQ_METHOD.POST, url, option),
  put: <T>(url: string, option?: CustomRequestInit) =>
    handleRequest<T>(REQ_METHOD.PUT, url, option),
  patch: <T>(url: string, option?: CustomRequestInit) =>
    handleRequest<T>(REQ_METHOD.PATCH, url, option),
  delete: <T>(url: string, option?: CustomRequestInit) =>
    handleRequest<T>(REQ_METHOD.DELETE, url, option),
}

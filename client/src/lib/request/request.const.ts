export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
}

export enum REQ_LOCATION {
  PARAMS = 'params',
  QUERY = 'query',
  BODY = 'body',
}

export enum REQ_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface CustomRequestInit extends Omit<RequestInit, 'body'> {
  baseUrl?: string
  body?: Record<string, any>
}

export class AppException extends Error {
  statusCode: number
  constructor(payload: { message: string; statusCode: number }) {
    super(payload.message)
    this.statusCode = payload.statusCode
  }
}
export interface IValidateErrorDetail {
  message: string
  path: PropertyKey[]
}

export interface IValidateErrorInfor {
  location: REQ_LOCATION
  errors: IValidateErrorDetail[]
}

export class UnprocessableEntityException extends AppException {
  errorInfor: IValidateErrorInfor
  constructor(payload: { message: string; errorInfor: IValidateErrorInfor }) {
    super({ message: payload.message, statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY })
    this.errorInfor = payload.errorInfor
  }
}

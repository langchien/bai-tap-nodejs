import { STATUS_CODE, STATUS_MESSAGE } from './status-code'

export interface IValidateErrorDetail {
  message: string
  path: PropertyKey[]
}

export interface IValidateErrorInfor {
  location: 'params' | 'query' | 'body'
  errors: IValidateErrorDetail[]
}

/**
 * @param message - Tin nhắn sẽ trả về cho client khi xảy ra lỗi.
 * @param statusCode - Mã trạng thái HTTP (mặc định là 500).
 * @description Lớp này đóng vai trò là cơ sở cho mọi ngoại lệ tùy chỉnh trong ứng dụng.
 */
export class AppException extends Error {
  statusCode: number
  constructor(statusCode: STATUS_CODE = STATUS_CODE.INTERNAL_SERVER_ERROR, message?: string) {
    super(message ?? STATUS_MESSAGE[statusCode])
    this.statusCode = statusCode
  }
}

export class BadRequestException extends AppException {
  errorInfor?: IValidateErrorInfor
  constructor(
    errorInfor?: IValidateErrorInfor,
    message: string = STATUS_MESSAGE[STATUS_CODE.BAD_REQUEST],
  ) {
    super(STATUS_CODE.BAD_REQUEST, message)
    this.errorInfor = errorInfor
  }
}

export class UnauthorizedException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.UNAUTHORIZED, message)
  }
}

export class ForbiddenException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.FORBIDDEN, message)
  }
}

export class NotFoundException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.NOT_FOUND, message)
  }
}
export class ConflictException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.CONFLICT, message)
  }
}

export class TooManyRequestsException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.TOO_MANY_REQUESTS, message)
  }
}

export class PayloadTooLargeException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.PAYLOAD_TOO_LARGE, message)
  }
}

export class InternalServerErrorException extends AppException {
  constructor(message?: string) {
    super(STATUS_CODE.INTERNAL_SERVER_ERROR, message)
  }
}

export class UnprocessableEntityException extends AppException {
  errorInfor: IValidateErrorInfor
  constructor(validateError: IValidateErrorDetail[], message?: string) {
    super(STATUS_CODE.UNPROCESSABLE_ENTITY, message)
    this.errorInfor = { location: 'body', errors: validateError }
  }
}

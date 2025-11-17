import { STATUS_CODE, STATUS_MESSAGE } from './status-code'

/**
 * @param message - Tin nhắn sẽ trả về cho client khi xảy ra lỗi.
 * @param statusCode - Mã trạng thái HTTP (mặc định là 500).
 * @description Lớp này đóng vai trò là cơ sở cho mọi ngoại lệ tùy chỉnh trong ứng dụng.
 */
export class AppException extends Error {
  statusCode: number
  constructor(message: string, statusCode: number = STATUS_CODE.INTERNAL_SERVER_ERROR) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestException extends AppException {
  constructor(message: string = STATUS_MESSAGE.BAD_REQUEST) {
    super(message, STATUS_CODE.BAD_REQUEST)
  }
}

export class UnauthorizedException extends AppException {
  constructor(message: string = STATUS_MESSAGE.UNAUTHORIZED) {
    super(message, STATUS_CODE.UNAUTHORIZED)
  }
}

export class ForbiddenException extends AppException {
  constructor(message: string = STATUS_MESSAGE.FORBIDDEN) {
    super(message, STATUS_CODE.FORBIDDEN)
  }
}

export class NotFoundException extends AppException {
  constructor(message: string = STATUS_MESSAGE.NOT_FOUND) {
    super(message, STATUS_CODE.NOT_FOUND)
  }
}
export class ConflictException extends AppException {
  constructor(message: string = STATUS_MESSAGE.CONFLICT) {
    super(message, STATUS_CODE.CONFLICT)
  }
}

export class TooManyRequestsException extends AppException {
  constructor(message: string = STATUS_MESSAGE.TOO_MANY_REQUESTS) {
    super(message, STATUS_CODE.TOO_MANY_REQUESTS)
  }
}

export class PayloadTooLargeException extends AppException {
  constructor(message: string = STATUS_MESSAGE.PAYLOAD_TOO_LARGE) {
    super(message, STATUS_CODE.PAYLOAD_TOO_LARGE)
  }
}

export class InternalServerErrorException extends AppException {
  constructor(message: string = STATUS_MESSAGE.INTERNAL_SERVER_ERROR) {
    super(message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

export interface ErrorDetail {
  message: string
  path: PropertyKey[]
}

export class UnprocessableEntityException extends AppException {
  errors: ErrorDetail[]
  constructor(errors: ErrorDetail[], message: string = STATUS_MESSAGE.UNPROCESSABLE_ENTITY) {
    super(message, STATUS_CODE.UNPROCESSABLE_ENTITY)
    this.errors = errors
  }
}

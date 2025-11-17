import { logger } from '@/common/logger.service'
import { AppException, UnprocessableEntityException } from '@/constants/exceptions'
import { STATUS_CODE, STATUS_MESSAGE } from '@/constants/status-code'
import { NextFunction, Request, Response } from 'express'

export function handlerExceptionDefault() {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnprocessableEntityException)
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        errors: err.errors,
      })
    if (err instanceof AppException)
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
      })
    logger.error('Đã xảy ra lỗi không mong muốn:', err)
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    })
  }
}

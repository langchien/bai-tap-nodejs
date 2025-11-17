import { zodValidate } from '@/common/core/validate.middleware'
import { Router } from 'express'
import { userController } from './user.controller'
import {
  CreateUserReqBodyDtoSchema,
  UpdateUserReqBodyDtoSchema,
  UserIdReqParamsDtoSchema,
} from './user.req.dto'

export const userRoute = Router()

userRoute.get('/:userId', zodValidate(UserIdReqParamsDtoSchema, 'params'), userController.findOne)

userRoute.get('/', userController.findAll)

userRoute.delete('/:userId', zodValidate(UserIdReqParamsDtoSchema, 'params'), userController.delete)

userRoute.post('/', zodValidate(CreateUserReqBodyDtoSchema), userController.create)

userRoute.put(
  '/:userId',
  zodValidate(UserIdReqParamsDtoSchema, 'params'),
  zodValidate(UpdateUserReqBodyDtoSchema),
  userController.update,
)

import { zodValidate } from '@/lib/core/validate.middleware'
import { Router } from 'express'
import { userController } from './user.controller'
import {
  CreateUserReqBodySchema,
  UpdateUserReqBodySchema,
  UserIdReqParamsDtoSchema,
  UserSearchReqQueryDtoSchema,
} from './user.req.dto'

export const userRoute = Router()

userRoute.get('/:userId', zodValidate(UserIdReqParamsDtoSchema, 'params'), userController.findOne)

userRoute.get('/', zodValidate(UserSearchReqQueryDtoSchema, 'query'), userController.findAll)

userRoute.delete('/:userId', zodValidate(UserIdReqParamsDtoSchema, 'params'), userController.delete)

userRoute.post('/', zodValidate(CreateUserReqBodySchema), userController.create)

userRoute.put(
  '/:userId',
  zodValidate(UserIdReqParamsDtoSchema, 'params'),
  zodValidate(UpdateUserReqBodySchema),
  userController.update,
)

import { createStringIdSchema, PasswordSchema } from '@/lib/schema.common'
import z from 'zod'
import { UserCollection } from './user.schema'

// reqest body dto
export const CreateUserReqBodyDtoSchema = UserCollection.omit({
  hashedPassword: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: PasswordSchema,
})

export interface ICreateUserReqBodyDto extends z.infer<typeof CreateUserReqBodyDtoSchema> {}

export const UpdateUserReqBodyDtoSchema = CreateUserReqBodyDtoSchema.omit({
  password: true,
}).partial()

export interface IUpdateUserReqBodyDto extends z.infer<typeof UpdateUserReqBodyDtoSchema> {}

// request params dto
export const UserIdReqParamsDtoSchema = z.object({
  userId: createStringIdSchema('userId'),
})

export interface IUserIdReqParamsDto extends z.infer<typeof UserIdReqParamsDtoSchema> {}

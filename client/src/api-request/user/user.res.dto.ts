import { UserSchema } from './user.schema'

export const UserResDtoSchema = UserSchema.omit({
  hashedPassword: true,
})
export interface IUserResDto extends ReturnType<typeof UserResDtoSchema.parse> {}

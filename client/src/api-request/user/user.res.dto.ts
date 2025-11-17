import { UserSchema } from './user.schema'

export const UserResSchema = UserSchema.omit({
  hashedPassword: true,
})
export interface IUserResDto extends ReturnType<typeof UserResSchema.parse> {}

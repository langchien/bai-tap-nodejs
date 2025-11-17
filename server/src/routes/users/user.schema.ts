import { createObjectIdSchema } from '@/common/schema.common'
import z from 'zod'

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const UserStatusSchema = z.enum(UserStatus)

export const UserSchema = z.object({
  id: createObjectIdSchema(),
  username: z.string().min(3).max(30),
  hashedPassword: z.string(),
  displayName: z.string().min(3).max(50),
  email: z.email(),
  phone: z.string().min(10).max(15).optional(),
  status: UserStatusSchema,
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
})

export const UserCollection = UserSchema.omit({
  id: true,
})

export const UpdateUserSchema = UserCollection.partial().omit({
  createdAt: true,
})

export interface IUser extends z.infer<typeof UserSchema> {}
export interface IInputInsertUser extends z.input<typeof UserCollection> {}
export interface IInputUpdateUser extends z.input<typeof UpdateUserSchema> {}

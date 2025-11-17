import { createObjectIdSchema, createStringSchema } from '@/lib/schema.common'
import z from 'zod'

enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const UserStatusSchema = z.enum(UserStatus, {
  error: 'Trạng thái người dùng phải là active hoặc inactive',
})

export const UserSchema = z.object({
  id: createObjectIdSchema(),
  username: createStringSchema('Tên đăng nhập', 3, 30),
  hashedPassword: z.string(),
  displayName: createStringSchema('Tên hiển thị', 1, 100),
  email: z.email('Email không hợp lệ'),
  phone: createStringSchema('Số điện thoại', 10, 15).optional(),
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

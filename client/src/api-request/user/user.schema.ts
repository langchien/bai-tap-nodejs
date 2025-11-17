import { createObjectIdSchema, createStringSchema } from '@/lib/schema.common'
import z from 'zod'

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const USER_STATUSSchema = z.enum(USER_STATUS, {
  error: 'Trạng thái người dùng phải là active hoặc inactive',
})

export const UserSchema = z.object({
  id: createObjectIdSchema(),
  username: createStringSchema('Tên đăng nhập', 3, 30),
  hashedPassword: z.string(),
  displayName: createStringSchema('Tên hiển thị', 1, 100),
  email: z.email('Email không hợp lệ'),
  phoneNumber: createStringSchema('Số điện thoại', 10, 15).optional(),
  status: USER_STATUSSchema,
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

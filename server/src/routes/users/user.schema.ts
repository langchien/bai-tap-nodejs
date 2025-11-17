import { createObjectIdSchema } from '@/common/schema.common'
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
  username: z
    .string('Tên đăng nhập phải là 1 chuỗi ký tự tự')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(30, 'Tên đăng nhập không được vượt quá 30 ký tự'),
  hashedPassword: z.string(),
  displayName: z
    .string('Tên hiển thị phải là 1 chuỗi ký tự')
    .min(3, 'Tên hiển thị phải có ít nhất 3 ký tự')
    .max(50, 'Tên hiển thị không được vượt quá 50 ký tự'),
  email: z.email('Email không hợp lệ'),
  phone: z
    .string('Số điện thoại phải là chuỗi ký tự')
    .min(10, 'Số điện thoại phải có ít nhất 10 ký tự')
    .max(15, 'Số điện thoại không được vượt quá 15 ký tự')
    .optional(),
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

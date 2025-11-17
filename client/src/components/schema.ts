import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự'),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
})

export const AddUserSchema = UserSchema.pick({
  createdAt: true,
  email: true,
  name: true,
  phone: true,
  status: true,
})

export interface IAddUser extends z.infer<typeof AddUserSchema> {}
export type UserStatus = 'active' | 'inactive'

export interface IUser extends z.infer<typeof UserSchema> {}

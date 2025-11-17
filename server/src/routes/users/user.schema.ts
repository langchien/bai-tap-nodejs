import { createObjectIdSchema } from '@/common/utils'
import z from 'zod'

export const UserSchema = z.object({
  _id: createObjectIdSchema(),
  username: z.string().min(3).max(30),
  hashedPassword: z.string(),
  displayName: z.string().min(3).max(50),
  email: z.email(),
  phone: z.string().min(10).max(15).optional(),
})

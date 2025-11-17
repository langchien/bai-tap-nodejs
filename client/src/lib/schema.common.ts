import { ObjectId } from 'bson'
import z from 'zod'

export const createStringIdSchema = (fieldName: string = 'id') =>
  z.string().refine((val) => ObjectId.isValid(val), {
    // : input must be a 24 character hex string, 12 byte Uint8Array, or an integer
    message: `${fieldName} phải phù hợp với ObjectId của mongodb (có 24 ký tự hex hoặc 12 byte Uint8Array hoặc một số nguyên)`,
  })

export const createObjectIdSchema = (fieldName: string = '_id') =>
  z.any().transform((val, ctx) => {
    if (!ObjectId.isValid(val)) {
      ctx.addIssue({
        code: 'custom',
        message: `${fieldName} không phải là một ObjectId hợp lệ`,
      })
      return z.NEVER
    }
    // return new ObjectId(val) // Clone từ backend sang và client chỉ cần dùng string thôi
    return new String(val)
  })

export const PasswordSchema = z.string('Mật khẩu không được để trống').refine(
  (val) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return regex.test(val)
  },
  {
    message:
      'Mật khẩu phải có ít nhất 8 ký tự, bao gồm tối thiểu 1 ký tự đặc biệt, tối thiểu 1 số, 1 chữ viết hoa và 1 chữ viết thường',
  },
)

export const createStringSchema = (
  fieldName: string,
  minLength: number = 1,
  maxLength: number = 1000,
) =>
  z
    .string(`${fieldName} phải là một chuỗi ký tự`)
    .min(minLength, `${fieldName} phải có ít nhất ${minLength} ký tự`)
    .max(maxLength, `${fieldName} không được vượt quá ${maxLength} ký tự`)

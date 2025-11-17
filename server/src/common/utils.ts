import { ObjectId } from 'mongodb'
import z from 'zod'

export const createObjectIdSchema = (fieldName: string = '_id') =>
  z.any().transform((val, ctx) => {
    if (!ObjectId.isValid(val)) {
      ctx.addIssue({
        code: 'custom',
        message: `${fieldName} không phải là một ObjectId hợp lệ`,
      })
      return z.NEVER
    }
    return new ObjectId(val)
  })

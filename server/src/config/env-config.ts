import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const EnvConfigSchema = z.object({
  port: z.coerce.number().default(8000),
  mongodb: z.object({
    uri: z.string().min(1, 'MONGODB_URI is required'),
    dbName: z.string().min(1, 'MONGODB_DB_NAME is required'),
  }),
})

interface IEnvConfigInput extends z.input<typeof EnvConfigSchema> {}

const envConfigInput: IEnvConfigInput = {
  port: process.env.PORT,
  mongodb: {
    dbName: process.env.MONGODB_DB_NAME!,
    uri: process.env.MONGODB_URI!,
  },
}

export const envConfig = EnvConfigSchema.parse(envConfigInput)

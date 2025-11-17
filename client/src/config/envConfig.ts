import z from 'zod'

const EnvConfigSchema = z.object({
  apiBaseUrl: z.string('API base URL không được để trống'),
})

interface IEnvConfigInput extends z.input<typeof EnvConfigSchema> {}

const ip: IEnvConfigInput = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
}

const verifyEnvConfig = () => {
  try {
    return EnvConfigSchema.parse(ip)
  } catch (error) {
    console.error('Lỗi thiếu các biến môi trường')
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        console.error(`- ${issue.message}`)
      }
    }
    process.exit(1)
  }
}

export const envConfig = verifyEnvConfig()

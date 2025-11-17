import { envConfig } from '@/config/env-config'
import { handlerExceptionDefault } from '@/lib//core/handler-exception'
import databaseService from '@/lib//database.service'
import { logger } from '@/lib/logger.service'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { userRoute } from './routes/users/user.route'

const main = async () => {
  const app = express()

  const httpServer = createServer(app)
  await databaseService.connect() // Kết nối đến database
  app.use(express.json()) // Middleware để phân tích JSON body
  // cho phép truy cập từ các nguồn khác (CORS)
  app.use(cors())
  // Đăng ký các route
  app.use('/users', userRoute)

  // Phải đặt sau tất cả các route khác
  app.use(handlerExceptionDefault()) // Middleware xử lý ngoại lệ

  httpServer.listen(envConfig.port, () => {
    logger.info(`Click http://localhost:${envConfig.port} để truy cập ứng dụng`)
  })
}
main()

import { envConfig } from '@/config/env-config'
import { Db, MongoClient } from 'mongodb'
import { logger } from './logger.service'

/**
 * @description Áp dụng Singleton pattern để quản lý một instance duy nhất của DatabaseService
 */
export class DatabaseService {
  private static instance: DatabaseService
  private client: MongoClient
  private _db: Db | null = null

  private constructor() {
    this.client = new MongoClient(envConfig.mongodb.uri)
  }

  /**
   * @message Lấy instance của DatabaseService (Singleton)
   * @returns momgoClient
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect()
      this._db = this.client.db(envConfig.mongodb.dbName)
      await this._db.command({ ping: 1 })
      await this.indexedDB()
      logger.success('Kết nối đến MongoDB thành công.')
    } catch (error) {
      logger.error('Lỗi kết nối đến MongoDB:', error)
      throw error
    }
  }

  public get db(): Db {
    if (!this._db) {
      throw new Error(
        'Kết nối đến database chưa được thiết lập, vui lòng gọi connect() trước tiên.',
      )
    }
    return this._db
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this._db = null
      logger.info('MongoDB connection closed.')
    }
  }

  get users() {
    return this.db.collection('users')
  }

  private async indexedDB() {
    const userIndexes = await this.users.indexes()
    // index text cho tìm kiếm nhanhh
    const USER_INDEX_TEXT = 'displayName_text_email_text_username_text'
    const textIndex = userIndexes.find((index) => index.name === USER_INDEX_TEXT)
    if (!textIndex) {
      await this.users.createIndex(
        {
          displayName: 'text',
          email: 'text',
          username: 'text',
        },
        {
          name: USER_INDEX_TEXT,
        },
      )
      logger.info(`Đã tạo text index "${USER_INDEX_TEXT}" cho collection users.`)
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await DatabaseService.getInstance().close()
  process.exit(0)
})

export default DatabaseService.getInstance()
export const databaseService = DatabaseService.getInstance()

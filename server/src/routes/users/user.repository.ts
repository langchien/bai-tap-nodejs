import databaseService from '@/lib/database.service'
import { ObjectId } from 'mongodb'
import {
  IInputInsertUser,
  IInputUpdateUser,
  IUser,
  UpdateUserSchema,
  UserCollection,
  UserSchema,
} from './user.schema'

const USER_COLLECTION = 'users'

class UserRepository {
  private get collection() {
    return databaseService.db.collection(USER_COLLECTION)
  }

  async create(data: IInputInsertUser): Promise<IUser> {
    const parsedData = UserCollection.parse(data)
    const result = await this.collection.insertOne(parsedData)
    const obj: IUser = {
      id: result.insertedId,
      ...parsedData,
    }
    return obj
  }

  async update(id: string, data: IInputUpdateUser): Promise<IUser | null> {
    const parsedData = UpdateUserSchema.parse(data)
    const result = await this.collection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { ...parsedData },
      },
      {
        returnDocument: 'after',
      },
    )
    if (!result) return null
    return UserSchema.parse({
      id: result._id,
      ...result,
    })
  }

  async findOneById(id: string): Promise<IUser | null> {
    const result = await this.collection.findOne({ _id: new ObjectId(id) })
    if (!result) return null
    return UserSchema.parse({
      id: result._id,
      ...result,
    })
  }

  async findAll(): Promise<IUser[]> {
    const results = await this.collection.find().toArray()
    return results.map((result) =>
      UserSchema.parse({
        id: result._id,
        ...result,
      }),
    )
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }
}

export const userRepository = new UserRepository()

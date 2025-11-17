import { NotFoundException } from '@/constants/exceptions'
import { STATUS_CODE } from '@/constants/status-code'
import { hashingService } from '@/lib/hashing.service'
import { RequestHandler } from 'express'
import { userRepository } from './user.repository'
import { ICreateUserReqBodyDto, IUpdateUserReqBodyDto, IUserIdReqParamsDto } from './user.req.dto'
import { IUserResDto, UserResDtoSchema } from './user.res.dto'

class UserController {
  findOne: RequestHandler<IUserIdReqParamsDto, IUserResDto> = async (req, res) => {
    const { userId } = req.params
    const user = await userRepository.findOneById(userId)
    if (!user) throw new NotFoundException()
    res.json(UserResDtoSchema.parse(user))
  }

  findAll: RequestHandler<any, IUserResDto[]> = async (req, res) => {
    const users = await userRepository.findAll()
    res.json(users.map((user) => UserResDtoSchema.parse(user)))
  }

  delete: RequestHandler = async (req, res) => {
    const { userId } = req.params
    const deleted = await userRepository.delete(userId)
    if (!deleted) throw new NotFoundException()
    res.status(STATUS_CODE.NO_CONTENT).send()
  }

  create: RequestHandler<any, IUserResDto, ICreateUserReqBodyDto> = async (req, res) => {
    const { password, ...rest } = req.body
    const hashedPassword = await hashingService.hash(password)
    const newUser = await userRepository.create({
      hashedPassword,
      ...rest,
    })
    res.status(STATUS_CODE.CREATED).json(UserResDtoSchema.parse(newUser))
  }

  update: RequestHandler<IUserIdReqParamsDto, IUserResDto, IUpdateUserReqBodyDto> = async (
    req,
    res,
  ) => {
    const { userId } = req.params
    const updatedUser = await userRepository.update(userId, req.body)
    if (!updatedUser) throw new NotFoundException()
    res.json(UserResDtoSchema.parse(updatedUser))
  }
}

export const userController = new UserController()

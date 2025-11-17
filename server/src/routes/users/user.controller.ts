import { NotFoundException } from '@/constants/exceptions'
import { STATUS_CODE } from '@/constants/status-code'
import { hashingService } from '@/lib/hashing.service'
import { RequestHandler } from 'express'
import { userRepository } from './user.repository'
import {
  ICreateUserReqBodyDto,
  IUpdateUserReqBodyDto,
  IUserIdReqParamsDto,
  IUserSearchReqQueryDto,
} from './user.req.dto'
import { IUserResDto, UserResSchema } from './user.res.dto'

class UserController {
  findOne: RequestHandler<IUserIdReqParamsDto, IUserResDto> = async (req, res) => {
    const { userId } = req.params
    const user = await userRepository.findOneById(userId)
    if (!user) throw new NotFoundException()
    res.json(UserResSchema.parse(user))
  }

  findAll: RequestHandler<any, IUserResDto[], any, IUserSearchReqQueryDto> = async (req, res) => {
    const { q } = req.query
    let results: IUserResDto[] = []
    if (q) results = await userRepository.searchByText(q)
    else results = await userRepository.findAll()
    res.json(results.map((user) => UserResSchema.parse(user)))
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
    res.status(STATUS_CODE.CREATED).json(UserResSchema.parse(newUser))
  }

  update: RequestHandler<IUserIdReqParamsDto, IUserResDto, IUpdateUserReqBodyDto> = async (
    req,
    res,
  ) => {
    const { userId } = req.params
    const updatedUser = await userRepository.update(userId, req.body)
    if (!updatedUser) throw new NotFoundException()
    res.json(UserResSchema.parse(updatedUser))
  }
}

export const userController = new UserController()

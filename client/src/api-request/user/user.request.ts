import { httpRequest } from '@/lib/request'
import type {
  ICreateUserReqBodyDto,
  IUpdateUserReqBodyDto,
  IUserSearchReqQueryDto,
} from './user.req.dto'
import { type IUserResDto } from './user.res.dto'

class UserRequest {
  private baseUrl = '/users'

  findOneById = (id: string) => {
    return httpRequest.get<IUserResDto>(`${this.baseUrl}/${id}`)
  }

  findAll = (query: IUserSearchReqQueryDto = {}) => {
    let queryString = this.baseUrl
    if (query.q) queryString += `?q=${encodeURIComponent(query.q)}`
    return httpRequest.get<IUserResDto[]>(queryString)
  }

  deleteById = (id: string) => {
    return httpRequest.delete<null>(`${this.baseUrl}/${id}`)
  }

  create = (body: ICreateUserReqBodyDto) => {
    return httpRequest.post<IUserResDto>(this.baseUrl, {
      body,
    })
  }

  updateById = (id: string, body: IUpdateUserReqBodyDto) => {
    return httpRequest.put<IUserResDto>(`${this.baseUrl}/${id}`, {
      body,
    })
  }
}

export const userRequest = new UserRequest()

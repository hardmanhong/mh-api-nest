import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { generateHashedPassword, generateString } from 'src/util'
import { CommonException } from 'src/exception'
import { TokenService } from '../token/token.service'
import { Token } from '../token/token.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async login(user: User, tokenService: TokenService) {
    const find = await this.usersRepository.findOneBy({ name: user.name })
    if (!find) throw new CommonException('用户不存在')
    const password = generateHashedPassword(user.password, find.salt)
    const result = await this.usersRepository.findOneBy({
      name: user.name,
      password
    })
    if (!result) throw new CommonException('密码错误')
    const tokenString = generateString(32)
    const expireAt = new Date()
    expireAt.setDate(expireAt.getDate() + 30)
    const token = new Token()
    token.userId = find.id
    token.token = tokenString
    token.expireAt = expireAt
    tokenService.save(token)
    return tokenString
  }
  async register(user: User) {
    const find = await this.usersRepository.findOneBy({ name: user.name })
    if (find) throw new CommonException('用户名已存在')
    const salt = generateString(16)
    const password = generateHashedPassword(user.password, salt)
    user.password = password
    user.salt = salt
    return (await this.usersRepository.save(user)).id
  }
  async changePassword(user: User & { newPassword: string }) {
    const find = await this.usersRepository.findOneBy({ name: user.name })
    if (!find) throw new CommonException('用户不存在')
    const password = generateHashedPassword(user.password, find.salt)
    const result = await this.usersRepository.findOneBy({
      name: user.name,
      password
    })
    if (!result) throw new CommonException('密码错误')
    const newPassword = generateHashedPassword(user.newPassword, find.salt)
    find.password = newPassword
    return (await this.usersRepository.save(find)).id
  }
}

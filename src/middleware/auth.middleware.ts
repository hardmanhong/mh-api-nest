import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { TokenService } from 'src/api/token/token.service'
import { AuthException } from 'src/exception'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.token as string
    if (!token) throw new AuthException()
    const tokenEntity = await this.tokenService.validate(token)
    if (tokenEntity) {
      if (tokenEntity.expireAt < new Date()) {
        throw new AuthException('凭证已过期，请重新登录')
      }
      req.app.set('userId', tokenEntity.userId)
      next()
    } else {
      throw new AuthException()
    }
  }
}

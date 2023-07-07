import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { TokenService } from '../token/token.service'

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  @Post('login')
  @HttpCode(200)
  login(@Body() user: User) {
    return this.userService.login(user, this.tokenService)
  }

  @Post('register')
  @HttpCode(200)
  register(@Body() user: User) {
    return this.userService.register(user)
  }

  @Post('changePassword')
  changePassword(@Body() user: User & { newPassword: string }) {
    return this.userService.changePassword(user)
  }
}

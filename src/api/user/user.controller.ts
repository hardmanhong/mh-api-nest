import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiDataResponse, ApiNullResponse } from 'src/decorators'
import { TokenService } from '../token/token.service'
import { ChangePasswordUserDto, UserDto } from './user.dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '登录' })
  @ApiDataResponse('string')
  login(@Body() user: UserDto) {
    return this.userService.login(user, this.tokenService)
  }

  @Post('register')
  @HttpCode(200)
  @ApiOperation({ summary: '注册' })
  @ApiNullResponse()
  register(@Body() user: UserDto) {
    this.userService.register(user)
    return null
  }

  @Post('changePassword')
  @ApiOperation({ summary: '修改密码' })
  @ApiNullResponse()
  changePassword(@Body() user: ChangePasswordUserDto) {
    this.userService.changePassword(user)
    return null
  }
}

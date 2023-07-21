import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({
    description: '用户名'
  })
  readonly name: string

  @ApiProperty({
    description: '密码'
  })
  readonly password: string
}

export class ChangePasswordUserDto extends UserDto {
  @ApiProperty({
    description: '新密码'
  })
  newPassword: string
}

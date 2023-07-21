import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AccountDto {
  @ApiProperty({
    description: '账户ID'
  })
  id: number

  @IsNotEmpty()
  @ApiProperty({
    description: '账户名'
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({
    description: '服务器'
  })
  server: string

  @ApiProperty({
    description: '创建时间',
    example: new Date().toISOString()
  })
  readonly createdAt: string

  @ApiProperty({
    description: '更新时间',
    example: new Date().toISOString()
  })
  readonly updatedAt: string
}

export class CreateAccountDto extends PickType(AccountDto, [
  'name',
  'server'
]) {}

export class UpdateAccountDto extends CreateAccountDto {
  id: number
}

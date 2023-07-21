import { ApiProperty, PickType } from '@nestjs/swagger'

export class PetDto {
  @ApiProperty({
    description: 'ID'
  })
  id: number

  @ApiProperty({
    description: '角色ID'
  })
  characterID: number

  @ApiProperty({
    description: '名称'
  })
  name: string

  @ApiProperty({
    description: '价格'
  })
  price: number

  @ApiProperty({
    description: '等级'
  })
  level: number

  @ApiProperty({
    description: '备注'
  })
  remark: string

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

export class CreatePetDto extends PickType(PetDto, [
  'name',
  'price',
  'level',
  'remark'
]) {}

export class UpdatePetDto extends PetDto {
  id: number
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { PaginationQuery } from 'src/decorators'
export class GoodsDto {
  @ApiProperty({
    description: 'ID',
    example: 1
  })
  readonly id: number

  @ApiProperty({
    description: '名称'
  })
  readonly name: string

  @ApiProperty({
    description: '最低价'
  })
  readonly minPrice: number

  @ApiProperty({
    description: '最高价'
  })
  readonly maxPrice: number

  @ApiProperty({
    description: '备注'
  })
  readonly remark: string

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

export class FindAllGoodsDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    description: '名称'
  })
  name?: string
}
export class CreateGoodsDto {
  @ApiProperty({
    description: '名称'
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({
    description: '最低价'
  })
  @IsNotEmpty()
  @IsNumber()
  readonly minPrice: number

  @ApiProperty({
    description: '最高价'
  })
  @IsNotEmpty()
  @IsNumber()
  readonly maxPrice: number
}
export class UpdateGoodsDto extends CreateGoodsDto {
  id: number
}

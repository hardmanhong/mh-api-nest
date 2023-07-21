import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class SellDto {
  @ApiProperty({
    description: 'ID'
  })
  id: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '商品ID'
  })
  goodsId: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '卖出价'
  })
  price: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '卖出数量'
  })
  quantity: number

  @ApiProperty({
    description: '单个利润'
  })
  profit: number

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
export class CreateSellDto extends PickType(SellDto, [
  'goodsId',
  'price',
  'quantity',
  'remark'
]) {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '买入ID'
  })
  buyId: number
}
export class UpdateSellDto extends PickType(CreateSellDto, [
  'buyId',
  'price',
  'quantity',
  'remark'
]) {
  id: number
}

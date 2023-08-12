import { ApiProperty, PickType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'
import { PaginationQuery } from 'src/decorators'
import { GoodsDto } from '../goods/goods.dto'
import { SellDto } from '../sell/sell.dto'
import { Sort } from './buy.interface'

export class BuyDto {
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
  @ApiProperty({
    description: '买入价'
  })
  price: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '买入数量'
  })
  quantity: number

  @ApiProperty({
    description: '库存数量'
  })
  inventory: number

  @ApiProperty({
    description: '是否卖出 0 未卖出 1 卖出',
    enum: [0, 1]
  })
  hasSold: 0 | 1

  @ApiProperty({
    description: '总金额'
  })
  totalAmount: number

  @ApiProperty({
    description: '总利润'
  })
  totalProfit: number

  @ApiProperty({
    description: '备注'
  })
  remark: string

  @ApiProperty({
    description: '商品',
    type: GoodsDto
  })
  goods: GoodsDto

  @ApiProperty({
    description: '卖出记录',
    type: [SellDto]
  })
  sales: SellDto[]

  @ApiProperty({
    description: '创建时间',
    example: new Date().toISOString()
  })
  createdAt: string

  @ApiProperty({
    description: '更新时间',
    example: new Date().toISOString()
  })
  updatedAt: string
}
class OrderDto {
  @IsEnum(['ASC', 'DESC'])
  @Expose()
  @ApiProperty({
    required: false,
    description: '库存',
    enum: ['ASC', 'DESC'],
    name: 'order[inventory]'
  })
  inventory?: Sort

  @IsEnum(['ASC', 'DESC'])
  @Expose()
  @ApiProperty({
    required: false,
    description: '是否卖出',
    enum: ['ASC', 'DESC'],
    name: 'order[hasSold]'
  })
  hasSold?: Sort
}
export class FindAllBuyDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    description: '商品ID'
  })
  goodsIds?: string[]

  @ApiProperty({
    required: false,
    description: '开始时间'
  })
  startAt?: string

  @ApiProperty({
    required: false,
    description: '结束时间'
  })
  endAt?: string

  @ApiProperty({
    required: false,
    type: () => OrderDto,
    description: '排序'
  })
  @Type(() => OrderDto)
  @Expose()
  order?: OrderDto
}
export class CreateBuyDto extends PickType(BuyDto, [
  'goodsId',
  'price',
  'quantity',
  'remark'
]) {}
export class UpdateBuyDto extends PickType(BuyDto, [
  'price',
  'quantity',
  'remark'
]) {
  id: number
}

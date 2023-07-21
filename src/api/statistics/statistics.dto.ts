import { ApiProperty } from '@nestjs/swagger'
import { TimeDimension } from './statistics.interface'

export class StatisticsDto {
  @ApiProperty({
    description: '总库存'
  })
  totalInventory: string

  @ApiProperty({
    description: '总利润'
  })
  totalProfit: string
}
class BusinessItem {
  @ApiProperty({
    description: '日期'
  })
  date: string

  @ApiProperty({
    description: '数值'
  })
  value: number

  @ApiProperty({
    description: '类型'
  })
  name: string
}

export class QueryBusinessDto {
  @ApiProperty({
    required: false,
    description: "时间维度 'day', 'week','month', 'year'",
    enum: ['day', 'week', 'month', 'year'],
    default: 'day'
  })
  type: TimeDimension
}
export class BusinessDto {
  @ApiProperty({
    description: '买入',
    type: [BusinessItem]
  })
  buyList: BusinessItem[]

  @ApiProperty({
    description: '卖出',
    type: [BusinessItem]
  })
  sellList: BusinessItem[]

  @ApiProperty({
    description: '利润',
    type: [BusinessItem]
  })
  profitList: BusinessItem[]
}
export class InventoryDto {
  @ApiProperty({
    description: '商品ID'
  })
  goodsId: number

  @ApiProperty({
    description: '商品名称'
  })
  goodsName: number

  @ApiProperty({
    description: '库存数量'
  })
  totalInventory: number
}

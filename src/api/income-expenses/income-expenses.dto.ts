import { ApiProperty, OmitType } from '@nestjs/swagger'
import { PaginationQuery } from 'src/decorators'

export class IncomeExpensesDto {
  @ApiProperty({
    description: 'ID'
  })
  id: number

  @ApiProperty({
    description: '类型 1 收入 2 支出',
    example: 1
  })
  type: 1 | 2

  @ApiProperty({
    description: '分类  1 点卡 2 金币 3 装备 4 宝宝 5 其他',
    example: 1
  })
  category: 1 | 2 | 3 | 4

  @ApiProperty({
    description: '金额'
  })
  amount: number

  @ApiProperty({
    description: '日期'
  })
  date: string

  @ApiProperty({
    description: '备注'
  })
  remark: string
}

export class FindAllQueryDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    description: '类型 1 收入 2 支出',
    enum: [1, 2],
    example: 1
  })
  type?: 1 | 2

  @ApiProperty({
    required: false,
    description: '分类  1 点卡 2 金币 3 装备 4 宝宝 5 其他',
    enum: [1, 2, 3, 4, 5],
    example: [1]
  })
  category?: number[]
}

export class CreateIncomeExpensesDto extends OmitType(IncomeExpensesDto, [
  'id'
]) {}

export class UpdateIncomeExpensesDto extends IncomeExpensesDto {}

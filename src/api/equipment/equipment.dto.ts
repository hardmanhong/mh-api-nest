import { ApiProperty } from '@nestjs/swagger'

export class EquipmentDto {
  @ApiProperty({
    description: 'ID'
  })
  id: number

  @ApiProperty({
    description: '角色ID'
  })
  characterID: number

  @ApiProperty({
    description: '武器'
  })
  arms: string

  @ApiProperty({
    description: '头盔'
  })
  helmet: string

  @ApiProperty({
    description: '项链'
  })
  necklace: string

  @ApiProperty({
    description: '衣服'
  })
  clothes: string

  @ApiProperty({
    description: '腰带'
  })
  belt: string

  @ApiProperty({
    description: '鞋子'
  })
  shoe: string

  @ApiProperty({
    description: '戒指'
  })
  ring: string

  @ApiProperty({
    description: '手镯'
  })
  bracelet: string

  @ApiProperty({
    description: '耳饰'
  })
  earring: string

  @ApiProperty({
    description: '佩饰'
  })
  trimming: string

  @ApiProperty({
    description: '备注'
  })
  remark: string

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

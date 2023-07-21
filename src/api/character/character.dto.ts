import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { AccountDto } from '../account/account.dto'
import { EquipmentDto } from '../equipment/equipment.dto'
import { PetDto } from '../pet/pet.dto'

export class CharacterDto {
  @ApiProperty({
    description: 'ID'
  })
  id: number

  @IsNotEmpty()
  @ApiProperty({
    description: 'accountId'
  })
  accountId: number

  @IsNotEmpty()
  @ApiProperty({
    description: '昵称'
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({
    description: '造型'
  })
  molding: string

  @IsNotEmpty()
  @ApiProperty({
    description: '门派'
  })
  sect: string

  @IsNotEmpty()
  @ApiProperty({
    description: '等级'
  })
  level: string

  @ApiProperty({
    description: '备注'
  })
  remark: string

  @ApiProperty({
    description: '账号',
    type: AccountDto
  })
  account: AccountDto

  @ApiProperty({
    description: '装备',
    type: EquipmentDto
  })
  equipment: EquipmentDto

  @ApiProperty({
    description: '宠物',
    type: [PetDto]
  })
  pets: PetDto[]

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
export class CreateCharacterDto extends OmitType(CharacterDto, [
  'id',
  'account'
]) {}

export class UpdateCharacterDto extends OmitType(CharacterDto, ['account']) {}

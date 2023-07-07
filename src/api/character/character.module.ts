import { Module } from '@nestjs/common'
import { CharacterController } from './character.controller'
import { CharacterService } from './character.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Character } from './character.entity'
import { EquipmentModule } from '../equipment/equipment.module'
import { PetModule } from '../pet/pet.module'

@Module({
  imports: [TypeOrmModule.forFeature([Character]), EquipmentModule, PetModule],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}

import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Character } from './character.entity'
import { Request } from 'express'
import { CommonException } from 'src/exception'
import { EquipmentService } from '../equipment/equipment.service'
import { PetService } from '../pet/pet.service'
import { Equipment } from '../equipment/equipment.entity'
import { Pet } from '../pet/pet.entity'

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private dataSource: DataSource,
    private equipmentService: EquipmentService,
    private petService: PetService,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  findAll() {
    return this.characterRepository.find({
      relations: ['account', 'equipment', 'pets']
    })
  }
  findOne(id: number) {
    return this.characterRepository.findOne({
      where: { id },
      relations: ['account', 'equipment', 'pets']
    })
  }
  findOneById(id: number) {
    return this.characterRepository.findOneBy({
      id
    })
  }
  async create(character: Character) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let result = null
    try {
      result = await this.characterRepository.save(character)

      const equipment = new Equipment()
      equipment.characterID = result.id
      await this.equipmentService.create(equipment)

      character.pets.forEach((pet) => {
        pet.characterID = result.id
        this.petService.create(pet)
      })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      if (error instanceof CommonException) throw error
      throw new CommonException('创建失败')
    }
    return result.id
  }

  async update(character: Character) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let result = null
    try {
      const find = await this.findOne(character.id)
      if (!find) throw new CommonException('记录不存在')
      result = await this.characterRepository.save(character)

      const equipment = this.equipmentService.createEntity(character.equipment)
      equipment.id = find.equipment.id
      equipment.characterID = result.id
      await this.equipmentService.update(equipment)

      character.pets.forEach((pet) => {
        find.pets
        pet.characterID = result.id
        this.petService.update(this.petService.createEntity(pet))
      })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      console.log('error', error)
      if (error instanceof CommonException) throw error
      throw new CommonException('编辑失败', error)
    }

    return result.id
  }

  async remove(id: number) {
    this.characterRepository.delete(id)
    return null
  }
}

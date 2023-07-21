import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { CommonException } from 'src/exception'
import { Repository } from 'typeorm'
import { EquipmentDto } from './equipment.dto'
import { Equipment } from './equipment.entity'

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  findAll() {
    return this.equipmentRepository.find()
  }
  findOne(id: number) {
    return this.equipmentRepository.findOneBy({ id })
  }

  createEntity(equipment: EquipmentDto): EquipmentDto {
    const createdEntity = this.equipmentRepository.create(equipment)
    const createdDto: EquipmentDto = {
      ...createdEntity
    }
    return createdDto
  }

  async create(equipment: EquipmentDto) {
    return (await this.equipmentRepository.save(equipment)).id
  }

  async update(equipment: EquipmentDto) {
    const result = await this.findOne(equipment.id)
    if (!result) throw new CommonException('记录不存在')
    return (await this.equipmentRepository.save(equipment)).id
  }

  async remove(id: number) {
    this.equipmentRepository.delete(id)
    return null
  }
}

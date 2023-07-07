import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Equipment } from './equipment.entity'
import { Request } from 'express'
import { CommonException } from 'src/exception'

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

  createEntity(equipment: Equipment) {
    return this.equipmentRepository.create(equipment)
  }

  async create(equipment: Equipment) {
    return (await this.equipmentRepository.save(equipment)).id
  }

  async update(equipment: Equipment) {
    const result = await this.findOne(equipment.id)
    if (!result) throw new CommonException('记录不存在')
    return (await this.equipmentRepository.save(equipment)).id
  }

  async remove(id: number) {
    this.equipmentRepository.delete(id)
    return null
  }
}

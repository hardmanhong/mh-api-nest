import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { CommonException } from 'src/exception'
import { Repository } from 'typeorm'
import { CreatePetDto, PetDto, UpdatePetDto } from './pet.dto'
import { Pet } from './pet.entity'

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  findAll() {
    return this.petRepository.find()
  }
  findOne(id: number) {
    return this.petRepository.findOneBy({ id })
  }

  async create(pet: CreatePetDto) {
    return (await this.petRepository.save(pet)).id
  }
  createEntity(pet: PetDto) {
    return this.petRepository.create(pet)
  }
  async update(pet: UpdatePetDto) {
    const result = await this.findOne(pet.id)
    if (!result) throw new CommonException('记录不存在')
    return (await this.petRepository.save(pet)).id
  }

  async remove(id: number) {
    this.petRepository.delete(id)
    return null
  }
}

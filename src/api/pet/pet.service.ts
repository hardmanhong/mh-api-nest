import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { Request } from 'express';
import { CommonException } from 'src/exception';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @Inject('REQUEST') private readonly req: Request,
  ) {}
  findAll() {
    return this.petRepository.find();
  }
  findOne(id: number) {
    return this.petRepository.findOneBy({ id });
  }

  async create(pet: Pet) {
    return (await this.petRepository.save(pet)).id;
  }
  createEntity(pet: Pet) {
    return this.petRepository.create(pet);
  }
  async update(pet: Pet) {
    const result = await this.findOne(pet.id);
    if (!result) throw new CommonException('记录不存在');
    return (await this.petRepository.save(pet)).id;
  }

  async remove(id: number) {
    this.petRepository.delete(id);
    return null;
  }
}

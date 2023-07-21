import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { FindAllGoodsDto } from './goods.dto'
import { Goods } from './goods.entity'
import { IGoods } from './goods.interface'

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>
  ) {}
  async findAll(page: number, pageSize: number, query: FindAllGoodsDto) {
    const [list, total] = await this.goodsRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        name: Like(`%${query.name ?? ''}%`)
      }
    })
    return {
      list,
      total
    }
  }
  async findOne(id: number) {
    return this.goodsRepository.findOneBy({ id })
  }

  async create(goods: IGoods) {
    return (await this.goodsRepository.save(goods)).id
  }

  async update(goods: IGoods) {
    return (await this.goodsRepository.save(goods)).id
  }

  async remove(id: number) {
    this.goodsRepository.delete(id)
    return null
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Goods } from './goods.entity';
import { Request } from 'express';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
    @Inject('REQUEST') private readonly req: Request,
  ) {}
  async findAll(page: number, pageSize: number, query: any) {
    const userId = this.req.app.get('userId');
    console.log('goods findAll', userId);
    const [list, count] = await this.goodsRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        name: Like(`%${query.name ?? ''}%`),
      },
    });
    return {
      list,
      count,
    };
  }
  async findOne(id: number) {
    return this.goodsRepository.findOneBy({ id });
  }

  async create(goods: Goods) {
    return this.goodsRepository.save(goods);
  }

  async update(goods: Goods) {
    console.log('update', goods);
    return this.goodsRepository.save(goods);
  }

  async remove(id: number) {
    this.goodsRepository.delete(id);
    return null;
  }
}

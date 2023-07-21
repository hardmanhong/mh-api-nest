import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { CommonException } from 'src/exception'
import { Between, In, Repository } from 'typeorm'
import { FindAllBuyDto } from './buy.dto'
import { Buy } from './buy.entity'
import { IBuy } from './buy.interface'

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Buy)
    private buyRepository: Repository<Buy>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  async findAll(
    page: number,
    pageSize: number,
    { goodsIds = [], startAt = null, endAt = null, order }: FindAllBuyDto
  ) {
    const userId = this.req.app.get('userId')
    const [list, total] = await this.buyRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        userId,
        ...(goodsIds.length && { goodsId: In(goodsIds) }),
        ...(startAt &&
          endAt && { createdAt: Between(new Date(startAt), new Date(endAt)) })
      },
      order: {
        ...order,
        createdAt: 'DESC'
      },
      relations: ['goods', 'sales']
      // 或者 使用 join 来关联 goods 表
      // join: {
      //   alias: 'buy',
      //   leftJoinAndSelect: {
      //     goods: 'buy.goods',
      //   },
      // },
    })
    const totalAmount = list
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0)
      .toFixed()
    const totalProfit = list
      .map((item) => Number(item.totalProfit))
      .reduce((a, b) => a + b, 0)
      .toFixed()

    const totalInventory = list
      .filter((item) => item.inventory > 0)
      .map((item) => item.price * item.inventory)
      .reduce((a, b) => a + b, 0)
      .toFixed()

    return {
      list,
      total,
      totalAmount,
      totalProfit,
      totalInventory
    }
  }
  async findOne(id: number) {
    return this.buyRepository.findOneBy({ id })
  }

  async create(buy: IBuy) {
    buy.userId = this.req.app.get('userId')
    buy.inventory = buy.quantity
    return (await this.buyRepository.save(buy)).id
  }

  async update(buy: IBuy) {
    buy.userId = this.req.app.get('userId')
    const result = await this.findOne(buy.id)
    if (!result) throw new CommonException('记录不存在')
    if (result.hasSold === 0) {
      buy.inventory = buy.quantity
    } else {
      if (buy.quantity < result.inventory) {
        throw new CommonException('买入数量不能小于库存')
      }
    }
    return (await this.buyRepository.save(buy)).id
  }

  async remove(id: number) {
    this.buyRepository.delete(id)
    return null
  }
}

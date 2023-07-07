import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Sell } from './sell.entity'
import { Request } from 'express'
import { BuyService } from '../buy/buy.service'
import { CommonException } from 'src/exception'

@Injectable()
export class SellService {
  constructor(
    @InjectRepository(Sell)
    private sellRepository: Repository<Sell>,
    private buyService: BuyService,
    private dataSource: DataSource,
    @Inject('REQUEST') private readonly req: Request
  ) {}

  async findOne(id: number) {
    return this.sellRepository.findOneBy({ id })
  }
  async create(sell: Sell) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let result = null
    try {
      const buy = await this.buyService.findOne(sell.buyId)
      if (!sell.quantity) throw new CommonException('请填写卖出数量')
      if (buy.inventory < sell.quantity)
        throw new CommonException('卖出数量超过买入数量')
      const profit = sell.price - buy.price
      buy.inventory -= sell.quantity
      buy.totalProfit = Number(buy.totalProfit) + Number(profit * sell.quantity)
      sell.profit = profit
      await queryRunner.manager.save(buy)
      result = await queryRunner.manager.save(this.sellRepository.create(sell))
      await queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err)
      await queryRunner.rollbackTransaction()
      if (err instanceof CommonException) throw err
      throw new CommonException('创建失败')
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
    return result?.id
  }

  async update(sell: Sell) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    let result = null
    try {
      const buy = await this.buyService.findOne(sell.buyId)

      if (!sell.quantity) throw new CommonException('请填写卖出数量')
      const lastSell = await this.findOne(sell.id)
      if (buy.inventory + lastSell.quantity < sell.quantity)
        throw new CommonException('卖出数量超过买入数量')
      const profit = Number(sell.price) - Number(buy.price)

      buy.hasSold = 1
      buy.inventory = buy.inventory + lastSell.quantity - sell.quantity
      buy.totalProfit =
        Number(buy.totalProfit) -
        Number(lastSell.profit) * lastSell.quantity +
        profit * sell.quantity
      await queryRunner.manager.save(buy)

      sell.profit = profit
      const sellEntity = this.sellRepository.create(sell)
      result = await queryRunner.manager.save(
        this.sellRepository.create(sellEntity)
      )
      await queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err)
      await queryRunner.rollbackTransaction()
      if (err instanceof CommonException) throw err
      throw new CommonException('编辑失败')
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
    return result?.id
  }

  async remove(id: number) {
    this.sellRepository.delete(id)
    return null
  }
}

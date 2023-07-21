import { Inject, Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { Request } from 'express'
import { DataSource } from 'typeorm'
import { Buy } from '../buy/buy.entity'
import { Sell } from '../sell/sell.entity'
import { TimeDimension } from './statistics.interface'

@Injectable()
export class StatisticsService {
  constructor(
    private dataSource: DataSource,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  async getStatistics() {
    const totalProfit =
      (
        await this.dataSource
          .getRepository(Buy)
          .createQueryBuilder('buy')
          .select('SUM(buy.totalProfit)', 'totalProfit')
          .where('buy.userId = :userId', {
            userId: this.req.app.get('userId')
          })
          .getRawOne()
      ).totalProfit || 0
    const totalInventory =
      (
        await this.dataSource
          .getRepository(Buy)
          .createQueryBuilder('buy')
          .select('SUM(buy.price * buy.inventory)', 'totalInventory')
          .where('buy.userId = :userId and buy.inventory > 0', {
            userId: this.req.app.get('userId')
          })
          .getRawOne()
      ).totalInventory || 0
    return {
      totalInventory,
      totalProfit
    }
  }
  private getDateRange(
    type: TimeDimension
  ): [list: string[], start: dayjs.Dayjs, end: dayjs.Dayjs] {
    const list = []
    const end = dayjs().endOf('day')
    switch (type) {
      case 'day': {
        const start = end.subtract(1, 'month').startOf('day')
        for (let i = start; i.isBefore(end); i = i.add(1, 'day')) {
          list.push(i.format('YYYY-MM-DD'))
        }
        return [list, start, end]
      }
      case 'week': {
        const start = end.subtract(1, 'month').startOf('day')
        for (let i = start; i.isBefore(end); i = i.add(7, 'day')) {
          const mondy = i.day(1)
          list.push(mondy.format('YYYY-MM-DD'))
        }
        return [list, end.subtract(1, 'month'), end]
      }
      case 'month': {
        const start = end.subtract(5, 'month').startOf('day')
        for (let i = start; i.isBefore(end); i = i.add(1, 'month')) {
          list.push(i.format('YYYY-MM'))
        }
        return [list, end.subtract(5, 'month'), end]
      }
      case 'year': {
        const start = end.subtract(2, 'year').startOf('day')
        for (let i = start; i.isBefore(end); i = i.add(1, 'year')) {
          list.push(i.format('YYYY'))
        }
        return [list, end.subtract(1, 'year'), end]
      }
      default:
        return [list, end.subtract(1, 'month'), end]
    }
  }

  private getBuyRows(dateFormat: string, { userId, startDate, endDate }) {
    return this.dataSource
      .getRepository(Buy)
      .createQueryBuilder('buy')
      .select(dateFormat, 'date')
      .addSelect('SUM(buy.price * buy.quantity)', 'value')
      .where('buy.userId = :userId', {
        userId
      })
      .andWhere('buy.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate()
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany()
  }
  private getSellRows(dateFormat: string, { userId, startDate, endDate }) {
    return this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select(dateFormat, 'date')
      .addSelect('SUM(sell.price * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate()
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany()
  }
  private getTotalProfitRows(
    dateFormat: string,
    { userId, startDate, endDate }
  ) {
    return this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .leftJoin('sell.buy', 'buy')
      .select(dateFormat, 'date')
      .addSelect('SUM(sell.profit * sell.quantity)', 'value')
      .where('buy.userId = :userId', {
        userId
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate()
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany()
  }
  private getProfitRows(dateFormat: string, { userId, startDate, endDate }) {
    return (
      this.dataSource
        .getRepository(Sell)
        .createQueryBuilder('sell')
        .leftJoin('sell.buy', 'buy')
        .leftJoin('sell.goods', 'goods')
        .select(dateFormat, 'date')
        .addSelect('goods.name', 'name')
        .addSelect('SUM(sell.profit * sell.quantity)', 'value')
        .where('buy.userId = :userId', {
          userId
        })
        .andWhere('sell.createdAt BETWEEN :start AND :end', {
          start: startDate.toDate(),
          end: endDate.toDate()
        })
        .groupBy('date')
        .addGroupBy('name')
        // .orderBy('date')
        .orderBy('value', 'DESC')
        .getRawMany()
    )
  }
  private getDateFormat(type: TimeDimension, table: 'buy' | 'sell') {
    const map = {
      day: `DATE_FORMAT(${table}.createdAt, "%Y-%m-%d")`,
      week: `DATE_FORMAT(DATE_SUB(${table}.createdAt, INTERVAL WEEKDAY(${table}.createdAt) DAY), "%Y-%m-%d")`,
      month: `DATE_FORMAT(${table}.createdAt, "%Y-%m")`,
      year: `DATE_FORMAT(${table}.createdAt, "%Y")`
    }
    return map[type] || map.day
  }

  async getBusiness(type: TimeDimension) {
    const [dateList, startDate, endDate] = this.getDateRange(type)
    const dateFormatBuy = this.getDateFormat(type, 'buy')
    const dateFormatSell = this.getDateFormat(type, 'sell')
    const userId = this.req.app.get('userId')
    const buyRows = await this.getBuyRows(dateFormatBuy, {
      userId,
      startDate,
      endDate
    })
    const sellRows = await this.getSellRows(dateFormatSell, {
      userId,
      startDate,
      endDate
    })

    const profitRows = (
      await this.getProfitRows(dateFormatSell, {
        userId,
        startDate,
        endDate
      })
    ).filter((item) => item.value > 0)
    const totalProfit = await this.getTotalProfitRows(dateFormatSell, {
      userId,
      startDate,
      endDate
    })
    console.log('totalProfit', totalProfit)
    const buyList = []
    const sellList = []
    const profitList = []
    dateList.forEach((date) => {
      const buy = buyRows.find((_) => _.date === date)
      buyList.push({
        date,
        value: buy ? parseFloat(buy.value) : 0,
        name: '买入'
      })
      const sell = sellRows.find((_) => _.date === date)
      sellList.push({
        date,
        value: sell ? parseFloat(sell.value) : 0,
        name: '卖出'
      })

      const profits = profitRows.filter((_) => _.date === date)
      if (profits.length) {
        const total = totalProfit.find((item) => item.date === date)
        profits.map((item) => ({ ...item, value: parseFloat(item.value) }))
        profits.forEach((profit) => {
          const percantage = (
            (parseFloat(profit.value) / parseFloat(total.value)) *
            100
          ).toFixed(2)
          profitList.push({
            ...profit,
            value: parseFloat(profit.value),
            total: parseFloat(total.value),
            percantage: percantage
          })
        })
      } else {
        profitList.push({ date, value: 0, name: '利润' })
      }
    })
    return { buyList, sellList, profitList }
  }

  async getInventory() {
    const list = await this.dataSource
      .getRepository(Buy)
      .createQueryBuilder('buy')
      .select([
        'goods.id AS goodsId',
        'goods.name AS goodsName',
        'SUM(buy.price * buy.inventory) AS totalInventory'
      ])
      .innerJoin('buy.goods', 'goods')
      .where('buy.userId = :userId and buy.inventory > 0', {
        userId: this.req.app.get('userId')
      })
      .groupBy('buy.goodsId')
      .orderBy('totalInventory', 'DESC')
      .getRawMany()
    const result = list.map((item) => {
      return {
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        totalInventory: parseFloat(item.totalInventory)
      }
    })
    return result
  }
}

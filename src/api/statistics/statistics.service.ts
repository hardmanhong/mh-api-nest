import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Buy } from '../buy/buy.entity';
import { TimeDimension } from './type';
import { Request } from 'express';
import dayjs from 'dayjs';
import { Sell } from '../sell/sell.entity';

@Injectable()
export class StatisticsService {
  constructor(
    private dataSource: DataSource,
    @Inject('REQUEST') private readonly req: Request,
  ) {}
  async getTotalProfit() {
    return (
      (
        await this.dataSource
          .getRepository(Buy)
          .createQueryBuilder('buy')
          .select('SUM(buy.totalProfit)', 'totalProfit')
          .getRawOne()
      ).totalProfit || 0
    );
  }
  private getDateRange(
    type: TimeDimension,
  ): [list: string[], start: dayjs.Dayjs, end: dayjs.Dayjs] {
    const list = [];
    const end = dayjs().endOf('day');
    switch (type) {
      case 'day': {
        const start = end.subtract(1, 'month').startOf('day');
        for (let i = start; i.isBefore(end); i = i.add(1, 'day')) {
          list.push(i.format('YYYY-MM-DD'));
        }
        return [list, start, end];
      }
      case 'week': {
        const start = end.subtract(1, 'month').startOf('day');
        for (let i = start; i.isBefore(end); i = i.add(7, 'day')) {
          const mondy = i.day(1);
          list.push(mondy.format('YYYY-MM-DD'));
        }
        return [list, end.subtract(1, 'month'), end];
      }
      case 'month': {
        const start = end.subtract(5, 'month').startOf('day');
        for (let i = start; i.isBefore(end); i = i.add(1, 'month')) {
          list.push(i.format('YYYY-MM'));
        }
        return [list, end.subtract(5, 'month'), end];
      }
      case 'year': {
        const start = end.subtract(2, 'year').startOf('day');
        for (let i = start; i.isBefore(end); i = i.add(1, 'year')) {
          list.push(i.format('YYYY'));
        }
        return [list, end.subtract(1, 'year'), end];
      }
      default:
        return [list, end.subtract(1, 'month'), end];
    }
  }
  private async getStatisticsByDay() {
    const [dateList, startDate, endDate] = this.getDateRange('day');
    const userId = this.req.app.get('userId');
    const buyRows = await this.dataSource
      .getRepository(Buy)
      .createQueryBuilder('buy')
      .select("DATE_FORMAT(buy.createdAt, '%Y-%m-%d')", 'date')
      .addSelect('SUM(buy.price * buy.quantity)', 'value')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('buy.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const sellRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select("DATE_FORMAT(sell.createdAt, '%Y-%m-%d')", 'date')
      .addSelect('SUM(sell.price * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const profitRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select("DATE_FORMAT(sell.createdAt, '%Y-%m-%d')", 'date')
      .addSelect('SUM(sell.profit * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
    const buyList = [];
    const sellList = [];
    const profitList = [];
    dateList.forEach((date) => {
      const buy = buyRows.find((_) => _.date === date);
      const buyItem = buy
        ? { ...buy, name: '买入' }
        : { date, value: 0, name: '买入' };
      buyList.push(buyItem);
      const sell = sellRows.find((_) => _.date === date);
      const sellItem = sell
        ? { ...sell, name: '卖出' }
        : { date, value: 0, name: '卖出' };
      sellList.push(sellItem);

      const profit = profitRows.find((_) => _.date === date);
      const profitItem = profit
        ? { ...profit, name: '利润' }
        : { date, value: 0, name: '利润' };

      profitList.push(profitItem);
    });
    return { buyList, sellList, profitList };
  }
  private async getStatisticsByWeek() {
    const [dateList, startDate, endDate] = this.getDateRange('week');
    const userId = this.req.app.get('userId');
    const buyRows = await this.dataSource
      .getRepository(Buy)
      .createQueryBuilder('buy')
      .select(
        "DATE_FORMAT(DATE_SUB(buy.createdAt, INTERVAL WEEKDAY(buy.createdAt) DAY), '%Y-%m-%d')",
        'date',
      )
      .addSelect('SUM(buy.price * buy.quantity)', 'value')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('buy.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const sellRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select(
        "DATE_FORMAT(DATE_SUB(sell.createdAt, INTERVAL WEEKDAY(sell.createdAt) DAY), '%Y-%m-%d')",
        'date',
      )
      .addSelect('SUM(sell.price * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const profitRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select(
        "DATE_FORMAT(DATE_SUB(sell.createdAt, INTERVAL WEEKDAY(sell.createdAt) DAY), '%Y-%m-%d')",
        'date',
      )
      .addSelect('SUM(sell.profit * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
    const buyList = [];
    const sellList = [];
    const profitList = [];
    dateList.forEach((date) => {
      const buy = buyRows.find((_) => _.date === date);
      const buyItem = buy
        ? { ...buy, name: '买入' }
        : { date, value: 0, name: '买入' };
      buyList.push(buyItem);

      const sell = sellRows.find((_) => _.date === date);
      const sellItem = sell
        ? { ...sell, name: '卖出' }
        : { date, value: 0, name: '卖出' };
      sellList.push(sellItem);

      const profit = profitRows.find((_) => _.date === date);
      const profitItem = profit
        ? { ...profit, name: '利润' }
        : { date, value: 0, name: '利润' };

      profitList.push(profitItem);
    });
    return { buyList, sellList, profitList };
  }
  private async getStatisticsByMonth() {
    const [dateList, startDate, endDate] = this.getDateRange('month');
    const userId = this.req.app.get('userId');
    const buyRows = await this.dataSource
      .getRepository(Buy)
      .createQueryBuilder('buy')
      .select("DATE_FORMAT(buy.createdAt, '%Y-%m')", 'date')
      .addSelect('SUM(buy.price * buy.quantity)', 'value')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('buy.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const sellRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select("DATE_FORMAT(buy.createdAt, '%Y-%m')", 'date')
      .addSelect('SUM(sell.price * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const profitRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select("DATE_FORMAT(buy.createdAt, '%Y-%m')", 'date')
      .addSelect('SUM(sell.profit * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
    const buyList = [];
    const sellList = [];
    const profitList = [];
    dateList.forEach((date) => {
      const buy = buyRows.find((_) => _.date === date);
      const buyItem = buy
        ? { ...buy, name: '买入' }
        : { date, value: 0, name: '买入' };
      buyList.push(buyItem);

      const sell = sellRows.find((_) => _.date === date);
      const sellItem = sell
        ? { ...sell, name: '卖出' }
        : { date, value: 0, name: '卖出' };
      sellList.push(sellItem);

      const profit = profitRows.find((_) => _.date === date);
      const profitItem = profit
        ? { ...profit, name: '利润' }
        : { date, value: 0, name: '利润' };

      profitList.push(profitItem);
    });
    return { buyList, sellList, profitList };
  }
  private async getStatisticsByYear() {
    const [dateList, startDate, endDate] = this.getDateRange('year');
    const userId = this.req.app.get('userId');
    const buyRows = await this.dataSource
      .getRepository(Buy)
      .createQueryBuilder('buy')
      .select("DATE_FORMAT(buy.createdAt, '%Y')", 'date')
      .addSelect('SUM(buy.price * buy.quantity)', 'value')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('buy.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const sellRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select("DATE_FORMAT(buy.createdAt, '%Y')", 'date')
      .addSelect('SUM(sell.price * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    const profitRows = await this.dataSource
      .getRepository(Sell)
      .createQueryBuilder('sell')
      .select("DATE_FORMAT(buy.createdAt, '%Y')", 'date')
      .addSelect('SUM(sell.profit * sell.quantity)', 'value')
      .leftJoin('sell.buy', 'buy')
      .where('buy.userId = :userId', {
        userId,
      })
      .andWhere('sell.createdAt BETWEEN :start AND :end', {
        start: startDate.toDate(),
        end: endDate.toDate(),
      })
      .groupBy('date')
      .orderBy('date')
      .getRawMany();
    const buyList = [];
    const sellList = [];
    const profitList = [];
    dateList.forEach((date) => {
      const buy = buyRows.find((_) => _.date === date);
      const buyItem = buy
        ? { ...buy, name: '买入' }
        : { date, value: 0, name: '买入' };
      buyList.push(buyItem);

      const sell = sellRows.find((_) => _.date === date);
      const sellItem = sell
        ? { ...sell, name: '卖出' }
        : { date, value: 0, name: '卖出' };
      sellList.push(sellItem);

      const profit = profitRows.find((_) => _.date === date);
      const profitItem = profit
        ? { ...profit, name: '利润' }
        : { date, value: 0, name: '利润' };

      profitList.push(profitItem);
    });
    return { buyList, sellList, profitList };
  }
  async getStatistics(type: TimeDimension) {
    switch (type) {
      case 'day':
        return this.getStatisticsByDay();
      case 'week':
        return this.getStatisticsByWeek();
      case 'month':
        return this.getStatisticsByMonth();
      case 'year':
        return this.getStatisticsByYear();
      default:
        return this.getStatisticsByDay();
    }
  }
}

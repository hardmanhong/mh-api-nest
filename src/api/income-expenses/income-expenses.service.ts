import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, Repository } from 'typeorm'
import { IncomeExpenses } from './income-expenses.entity'
import { Request } from 'express'
import { IQuery } from './type'

@Injectable()
export class IncomeExpensesService {
  constructor(
    @InjectRepository(IncomeExpenses)
    private incomeExpensesRepository: Repository<IncomeExpenses>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  async findAll(
    page: number,
    pageSize: number,
    { type, category = [] }: IQuery
  ) {
    const userId = this.req.app.get('userId')
    const [list, count] = await this.incomeExpensesRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        userId,
        ...(type && { type }),
        ...(category.length && { category: In(category) })
      }
    })
    const income = await this.incomeExpensesRepository.sum('amount', [
      { userId, type: 1 }
    ])
    const expenses = await this.incomeExpensesRepository.sum('amount', [
      { userId, type: 2 }
    ])
    const surplus = income - expenses

    return {
      list,
      count,
      income,
      expenses,
      surplus
    }
  }
  async findOne(id: number) {
    return this.incomeExpensesRepository.findOneBy({ id })
  }

  async create(incomeExpenses: IncomeExpenses) {
    incomeExpenses.userId = this.req.app.get('userId')
    return this.incomeExpensesRepository.save(incomeExpenses)
  }

  async update(incomeExpenses: IncomeExpenses) {
    return this.incomeExpensesRepository.save(incomeExpenses)
  }

  async remove(id: number) {
    this.incomeExpensesRepository.delete(id)
    return null
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { In, Repository } from 'typeorm'
import { FindAllQueryDto } from './income-expenses.dto'
import { IncomeExpenses } from './income-expenses.entity'
import { IIncomeExpenses } from './income-expenses.interface'

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
    { type, category = [] }: FindAllQueryDto
  ) {
    const userId = this.req.app.get('userId')
    const [list, total] = await this.incomeExpensesRepository.findAndCount({
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
      total,
      income,
      expenses,
      surplus
    }
  }
  async findOne(id: number) {
    return this.incomeExpensesRepository.findOneBy({ id })
  }

  async create(incomeExpenses: IIncomeExpenses) {
    incomeExpenses.userId = this.req.app.get('userId')
    return this.incomeExpensesRepository.save(incomeExpenses)
  }

  async update(incomeExpenses: IIncomeExpenses) {
    return this.incomeExpensesRepository.save(incomeExpenses)
  }

  async remove(id: number) {
    this.incomeExpensesRepository.delete(id)
    return null
  }
}

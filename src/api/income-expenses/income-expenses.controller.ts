import {
  Query,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe
} from '@nestjs/common'
import { IncomeExpensesService } from './income-expenses.service'
import { IncomeExpenses } from './income-expenses.entity'
import {
  CreateIncomeExpensesDto,
  UpdateIncomeExpensesDto
} from './income-expenses.dto'
import { plainToClass } from 'class-transformer'
import { IQuery } from './type'

@Controller('income-expenses')
export class IncomeExpensesController {
  constructor(private incomeExpensesService: IncomeExpensesService) {}
  @Get()
  findAll(
    @Query()
    {
      page = 1,
      pageSize = 10,
      ...query
    }: { page: number; pageSize: number } & IQuery
  ) {
    return this.incomeExpensesService.findAll(page, pageSize, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incomeExpensesService.findOne(id)
  }

  @Post()
  create(@Body() incomeExpenses: CreateIncomeExpensesDto) {
    return this.incomeExpensesService.create(
      plainToClass(IncomeExpenses, incomeExpenses)
    )
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() incomeExpenses: UpdateIncomeExpensesDto
  ) {
    return this.incomeExpensesService.update(
      plainToClass(IncomeExpenses, {
        ...incomeExpenses,
        id
      })
    )
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incomeExpensesService.remove(id)
  }
}

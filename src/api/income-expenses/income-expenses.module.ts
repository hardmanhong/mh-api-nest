import { Module } from '@nestjs/common'
import { IncomeExpensesController } from './income-expenses.controller'
import { IncomeExpensesService } from './income-expenses.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IncomeExpenses } from './income-expenses.entity'

@Module({
  imports: [TypeOrmModule.forFeature([IncomeExpenses])],
  controllers: [IncomeExpensesController],
  providers: [IncomeExpensesService]
})
export class IncomeExpensesModule {}

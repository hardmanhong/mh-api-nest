export class IncomeExpensesDto {
  type: 1 | 2

  category: 1 | 2 | 3 | 4

  amount: number

  date: string

  remark: string
}

export class CreateIncomeExpensesDto extends IncomeExpensesDto {}

export class UpdateIncomeExpensesDto extends IncomeExpensesDto {
  id: string
}

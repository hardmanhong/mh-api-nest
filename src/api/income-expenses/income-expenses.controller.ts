import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'
import {
  ApiDataResponse,
  ApiListResponse,
  ApiNullResponse
} from 'src/decorators'
import {
  CreateIncomeExpensesDto,
  FindAllQueryDto,
  IncomeExpensesDto,
  UpdateIncomeExpensesDto
} from './income-expenses.dto'
import { IncomeExpenses } from './income-expenses.entity'
import { IncomeExpensesService } from './income-expenses.service'

@ApiTags('income-expenses')
@Controller('income-expenses')
export class IncomeExpensesController {
  constructor(private incomeExpensesService: IncomeExpensesService) {}
  @ApiOperation({
    summary: '查询收支列表'
  })
  @ApiListResponse(IncomeExpensesDto, {
    income: {
      type: 'number'
    },
    expenses: {
      type: 'number'
    },
    surplus: {
      type: 'number'
    }
  })
  @Get()
  findAll(@Query() { page = 1, pageSize = 10, ...query }: FindAllQueryDto) {
    return this.incomeExpensesService.findAll(page, pageSize, query)
  }

  @Get(':id')
  @ApiOperation({
    summary: '查询收支'
  })
  @ApiListResponse(IncomeExpensesDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incomeExpensesService.findOne(id)
  }

  @Post()
  @ApiOperation({
    summary: '创建收支'
  })
  @ApiDataResponse(IncomeExpensesDto)
  create(@Body() incomeExpenses: CreateIncomeExpensesDto) {
    return this.incomeExpensesService.create(incomeExpenses)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新收支' })
  @ApiDataResponse(IncomeExpensesDto)
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
  @ApiOperation({ summary: '删除收支' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incomeExpensesService.remove(id)
  }
}

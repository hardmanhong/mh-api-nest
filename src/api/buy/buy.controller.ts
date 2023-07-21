import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  ApiDataResponse,
  ApiListResponse,
  ApiNullResponse
} from 'src/decorators'
import { BuyDto, CreateBuyDto, FindAllBuyDto, UpdateBuyDto } from './buy.dto'
import { BuyService } from './buy.service'

@ApiTags('buy')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}
  @Get()
  @ApiOperation({ summary: '查询买入列表' })
  @ApiListResponse(BuyDto, {
    totalAmount: {
      type: 'number'
    },
    totalProfit: {
      type: 'number'
    },
    totalInventory: {
      type: 'number'
    }
  })
  findAll(
    @Query()
    { page = 1, pageSize = 10, ...query }: FindAllBuyDto
  ) {
    return this.buyService.findAll(page, pageSize, query)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询买入记录' })
  @ApiDataResponse(BuyDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.buyService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: '创建买入记录' })
  @ApiDataResponse('number')
  create(@Body() buy: CreateBuyDto) {
    return this.buyService.create(buy)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新买入记录' })
  @ApiDataResponse('number')
  update(@Param('id', ParseIntPipe) id: number, @Body() buy: UpdateBuyDto) {
    buy.id = id
    return this.buyService.update(buy)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除买入记录' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.buyService.remove(id)
  }
}

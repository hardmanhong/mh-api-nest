import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiDataResponse, ApiNullResponse } from 'src/decorators'
import { CreateSellDto, UpdateSellDto } from './sell.dto'
import { SellService } from './sell.service'
@ApiTags('sell')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('sell')
export class SellController {
  constructor(private sellService: SellService) {}
  @Post()
  @ApiOperation({ summary: '创建卖出记录' })
  @ApiDataResponse('number')
  create(@Body() sell: CreateSellDto) {
    return this.sellService.create(sell)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新卖出记录' })
  @ApiDataResponse('number')
  update(@Param('id', ParseIntPipe) id: number, @Body() sell: UpdateSellDto) {
    sell.id = id
    return this.sellService.update(sell)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除卖出记录' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sellService.remove(id)
  }
}

import {
  Query,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe
} from '@nestjs/common'
import { BuyService } from './buy.service'
import { Buy } from './buy.entity'
import { IQuery } from './type'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('buy')
export class BuyController {
  constructor(private buyService: BuyService) {}
  @Get()
  findAll(
    @Query()
    {
      page = 1,
      pageSize = 10,
      ...query
    }: { page: number; pageSize: number } & IQuery
  ) {
    return this.buyService.findAll(page, pageSize, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.buyService.findOne(id)
  }

  @Post()
  create(@Body() buy: Buy) {
    return this.buyService.create(buy)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() buy: Buy) {
    buy.id = id
    return this.buyService.update(buy)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.buyService.remove(id)
  }
}

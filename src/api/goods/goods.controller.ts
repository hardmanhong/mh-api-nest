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
import { GoodsService } from './goods.service'
import { Goods } from './goods.entity'

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}
  @Get()
  findAll(@Query() { page = 1, pageSize = 10, ...query }) {
    return this.goodsService.findAll(page, pageSize, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.findOne(id)
  }

  @Post()
  create(@Body() goods: Goods) {
    return this.goodsService.create(goods)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() goods: Goods) {
    goods.id = id
    return this.goodsService.update(goods)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.remove(id)
  }
}

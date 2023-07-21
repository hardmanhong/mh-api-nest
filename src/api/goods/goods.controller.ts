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
import {
  ApiDataResponse,
  ApiListResponse,
  ApiNullResponse
} from 'src/decorators'
import {
  CreateGoodsDto,
  FindAllGoodsDto,
  GoodsDto,
  UpdateGoodsDto
} from './goods.dto'
import { GoodsService } from './goods.service'
@ApiTags('goods')
@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}
  @Get()
  @ApiOperation({ summary: '查询商品列表' })
  @ApiListResponse(GoodsDto)
  findAll(@Query() { page = 1, pageSize = 10, ...query }: FindAllGoodsDto) {
    return this.goodsService.findAll(page, pageSize, query)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询商品' })
  @ApiDataResponse(GoodsDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: '创建商品' })
  @ApiDataResponse('number')
  create(@Body() goods: CreateGoodsDto) {
    return this.goodsService.create(goods)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新商品' })
  @ApiDataResponse('number')
  update(@Param('id', ParseIntPipe) id: number, @Body() goods: UpdateGoodsDto) {
    goods.id = id
    return this.goodsService.update(goods)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除商品' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.goodsService.remove(id)
  }
}

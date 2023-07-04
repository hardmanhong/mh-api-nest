import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
} from '@nestjs/common';
import { SellService } from './sell.service';
import { Sell } from './sell.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('sell')
export class SellController {
  constructor(private sellService: SellService) {}
  @Post()
  create(@Body() sell: Sell) {
    return this.sellService.create(sell);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() sell: Sell) {
    sell.id = id;
    return this.sellService.update(sell);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sellService.remove(id);
  }
}

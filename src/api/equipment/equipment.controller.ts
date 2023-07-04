import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}
  @Get()
  findAll(@Query() {}) {
    return this.equipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.findOne(id);
  }

  @Post()
  create(@Body() equipment: any) {
    return this.equipmentService.create(equipment);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() equipment: any) {
    equipment.id = id;
    return this.equipmentService.update(equipment);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentService.remove(id);
  }
}

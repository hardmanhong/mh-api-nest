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
import { PetService } from './pet.service'

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}
  @Get()
  findAll(@Query() {}) {
    return this.petService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.petService.findOne(id)
  }

  @Post()
  create(@Body() pet: any) {
    return this.petService.create(pet)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() pet: any) {
    pet.id = id
    return this.petService.update(pet)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.petService.remove(id)
  }
}

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
import { ApiExcludeController } from '@nestjs/swagger'
import { CreatePetDto, UpdatePetDto } from './pet.dto'
import { PetService } from './pet.service'

@ApiExcludeController()
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
  create(@Body() pet: CreatePetDto) {
    return this.petService.create(pet)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() pet: UpdatePetDto) {
    pet.id = id
    return this.petService.update(pet)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.petService.remove(id)
  }
}

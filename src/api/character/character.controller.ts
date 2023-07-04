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
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}
  @Get()
  findAll(@Query() {}) {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.findOne(id);
  }

  @Post()
  create(@Body() character: any) {
    return this.characterService.create(character);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() character: any) {
    character.id = id;
    return this.characterService.update(character);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.remove(id);
  }
}

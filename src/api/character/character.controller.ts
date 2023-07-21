import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { ApiDataResponse, ApiNullResponse } from 'src/decorators'
import {
  CharacterDto,
  CreateCharacterDto,
  UpdateCharacterDto
} from './character.dto'
import { CharacterService } from './character.service'

@ApiTags('character')
@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}
  @Get()
  @ApiOperation({ summary: '查询角色列表' })
  @ApiExtraModels(CharacterDto)
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(CharacterDto)
      }
    }
  })
  findAll() {
    return this.characterService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '查询角色' })
  @ApiDataResponse(CharacterDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  @ApiDataResponse('number')
  create(@Body() character: CreateCharacterDto) {
    return this.characterService.create(character)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiDataResponse('number')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() character: UpdateCharacterDto
  ) {
    character.id = id
    return this.characterService.update(character)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.remove(id)
  }
}

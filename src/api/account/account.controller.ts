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
import { AccountDto, CreateAccountDto, UpdateAccountDto } from './account.dto'
import { AccountService } from './account.service'

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Get()
  @ApiOperation({ summary: '查询账号列表' })
  @ApiExtraModels(AccountDto)
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(AccountDto)
      }
    }
  })
  findAll() {
    return this.accountService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '查询账号' })
  @ApiDataResponse(AccountDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: '创建账号' })
  @ApiDataResponse('number')
  create(@Body() account: CreateAccountDto) {
    return this.accountService.create(account)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新账号' })
  @ApiDataResponse('number')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() account: UpdateAccountDto
  ) {
    account.id = id
    return this.accountService.update(account)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除账号' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.remove(id)
  }
}

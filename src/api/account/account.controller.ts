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
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Get()
  findAll(@Query() {}) {
    return this.accountService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id)
  }

  @Post()
  create(@Body() account: any) {
    return this.accountService.create(account)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() account: any) {
    account.id = id
    return this.accountService.update(account)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.remove(id)
  }
}

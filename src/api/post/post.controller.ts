import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { Post as PostClass } from './post.entity'
import { PostService } from './post.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  findAll(@Query() { page = 1, pageSize = 10, ...query }) {
    return this.postService.findAll(page, pageSize, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id)
  }

  @Post()
  create(@Body() post: PostClass) {
    return this.postService.create(post)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() post: PostClass) {
    post.id = id
    return this.postService.update(post)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id)
  }
}

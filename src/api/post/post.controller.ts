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
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  ApiDataResponse,
  ApiListResponse,
  ApiNullResponse
} from 'src/decorators'
import {
  CreatePostDto,
  FindAllPostDto,
  PostDto,
  UpdatePostDto
} from './post.dto'
import { PostService } from './post.service'

@ApiTags('post')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  @ApiOperation({ summary: '查询文章列表' })
  @ApiListResponse(PostDto)
  findAll(@Query() { page = 1, pageSize = 10, ...query }: FindAllPostDto) {
    return this.postService.findAll(page, pageSize, query)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询文章' })
  @ApiDataResponse(PostDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  @ApiDataResponse('number')
  create(@Body() post: CreatePostDto) {
    return this.postService.create(post)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新文章' })
  @ApiDataResponse(PostDto)
  update(@Param('id', ParseIntPipe) id: number, @Body() post: UpdatePostDto) {
    post.id = id
    return this.postService.update(post)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  @ApiNullResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id)
  }
}

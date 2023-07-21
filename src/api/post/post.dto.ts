import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { PaginationQuery } from 'src/decorators'

export class PostDto {
  @ApiProperty({
    description: 'ID'
  })
  id: number

  @IsNotEmpty()
  @ApiProperty({
    description: '标题'
  })
  title: string

  @IsNotEmpty()
  @ApiProperty({
    description: '内容'
  })
  content: string

  @ApiProperty({
    description: '创建时间',
    example: new Date().toISOString()
  })
  readonly createdAt: string

  @ApiProperty({
    description: '更新时间',
    example: new Date().toISOString()
  })
  readonly updatedAt: string
}
export class FindAllPostDto extends PaginationQuery {
  @ApiProperty({
    required: false,
    description: '标题'
  })
  title?: string
}
export class CreatePostDto extends PickType(PostDto, ['title', 'content']) {}

export class UpdatePostDto extends CreatePostDto {
  id: number
}

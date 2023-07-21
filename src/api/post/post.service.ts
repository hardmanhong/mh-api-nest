import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Like, Repository } from 'typeorm'
import { FindAllPostDto } from './post.dto'
import { Post } from './post.entity'
import { IPost } from './post.interface'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  async findAll(page: number, pageSize: number, query: FindAllPostDto) {
    const userId = this.req.app.get('userId')
    const [list, total] = await this.postRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        userId,
        title: Like(`%${query.title ?? ''}%`)
      }
    })
    return {
      list,
      total
    }
  }
  async findOne(id: number) {
    return this.postRepository.findOneBy({ id })
  }

  async create(post: IPost) {
    post.userId = this.req.app.get('userId')
    return (await this.postRepository.save(post)).id
  }

  async update(post: IPost) {
    post.userId = this.req.app.get('userId')
    return this.postRepository.save(post)
  }

  async remove(id: number) {
    this.postRepository.delete(id)
    return null
  }
}

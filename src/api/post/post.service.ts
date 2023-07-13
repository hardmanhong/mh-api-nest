import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Like, Repository } from 'typeorm'
import { Post } from './post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  async findAll(page: number, pageSize: number, query: any) {
    const userId = this.req.app.get('userId')
    const [list, count] = await this.postRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        userId,
        title: Like(`%${query.title ?? ''}%`)
      }
    })
    return {
      list,
      count
    }
  }
  async findOne(id: number) {
    return this.postRepository.findOneBy({ id })
  }

  async create(post: Post) {
    post.userId = this.req.app.get('userId')
    return (await this.postRepository.save(post)).id
  }

  async update(post: Post) {
    post.userId = this.req.app.get('userId')
    return this.postRepository.save(post)
  }

  async remove(id: number) {
    this.postRepository.delete(id)
    return null
  }
}

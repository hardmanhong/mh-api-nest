import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { CommonException } from 'src/exception'
import { Repository } from 'typeorm'
import { Account } from './account.entity'
import { IAccount } from './account.interface'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @Inject('REQUEST') private readonly req: Request
  ) {}
  findAll() {
    return this.accountRepository.find()
  }
  findOne(id: number) {
    return this.accountRepository.findOneBy({ id })
  }

  async create(account: IAccount) {
    account.userId = this.req.app.get('userId')
    const result = await this.accountRepository.findOneBy({
      name: account.name
    })
    if (result) throw new CommonException('账号已存在')
    return (await this.accountRepository.save(account)).id
  }

  async update(account: IAccount) {
    account.userId = this.req.app.get('userId')
    const result = await this.findOne(account.id)
    if (!result) throw new CommonException('记录不存在')
    return (await this.accountRepository.save(account)).id
  }

  async remove(id: number) {
    this.accountRepository.delete(id)
    return null
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}
  save(token: Token) {
    this.tokenRepository.save(token);
  }
  validate(token: string) {
    return this.tokenRepository.findOneBy({ token: token });
  }
}

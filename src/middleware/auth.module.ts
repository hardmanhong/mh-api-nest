import { Module } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { TokenModule } from 'src/api/token/token.module';

@Module({
  imports: [TokenModule],
  providers: [AuthMiddleware],
  exports: [],
})
export class AuthModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ApiModule from './api'
import { AuthMiddleware } from './middleware'
import { config } from './db/config'
import { AuthModule } from './middleware/auth.module'
import { TokenModule } from './api/token/token.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ...ApiModule,
    TokenModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('user/login', 'user/register')
      .forRoutes('*')
  }
}

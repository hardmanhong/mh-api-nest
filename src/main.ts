import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  BusinessExceptionFilter,
  HttpExceptionFilter,
  ValidationExceptionFilter
} from './exception'
import { ResponseInterceptor } from './interceptors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'token']
    }
  })
  app.setGlobalPrefix('v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new ValidationExceptionFilter())
  app.useGlobalFilters(new BusinessExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(9000)
}
bootstrap()

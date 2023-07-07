import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './interceptors'
import { BusinessExceptionFilter, HttpExceptionFilter } from './exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'token']
    }
  })
  app.setGlobalPrefix('v1')
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new BusinessExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(9000)
}
bootstrap()

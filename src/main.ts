import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
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

  const config = new DocumentBuilder()
    .setTitle('聚宝盆 API')
    .setVersion('v1')
    .addServer('http://localhost:9000/v1')
    .setExternalDoc('api-json', 'http://localhost:9000/api-json')
    .build()
  const document = SwaggerModule.createDocument(app, config, {})
  SwaggerModule.setup('api', app, document)

  app.setGlobalPrefix('v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new ValidationExceptionFilter())
  app.useGlobalFilters(new BusinessExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(9000)
}
bootstrap()

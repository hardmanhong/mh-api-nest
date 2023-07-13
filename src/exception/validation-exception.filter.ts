import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import express from 'express'

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse() as express.Response
    const validationResponse = exception.getResponse() as HttpException
    response.json({
      code: 422,
      message: `参数错误`,
      detail: validationResponse.message
    })
  }
}

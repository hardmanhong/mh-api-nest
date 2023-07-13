import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'

/**
 * 业务异常统一处理
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    response.json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      detail: exception.stack
    })
    console.error(
      // tslint:disable-line
      'HttpExceptionFilter code:%s message:%s \n%s',
      HttpStatus.INTERNAL_SERVER_ERROR,
      exception.message,
      exception.message
    )
  }
}

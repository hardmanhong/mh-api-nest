import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { BusinessException } from './business.exception'

/**
 * 业务异常统一处理
 */
@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    response.json({
      code: exception.code,
      message: exception.message,
      detail: exception.detail
    })
    console.error(
      // tslint:disable-line
      'BusinessException code:%s message:%s \n%s',
      exception.code,
      exception.message,
      exception.detail
    )
  }
}

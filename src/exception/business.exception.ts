import { HttpStatus } from '@nestjs/common'
/**
 * 业务异常
 */
export class BusinessException {
  constructor(
    readonly code: number,
    readonly message: string,
    readonly detail?: string
  ) {}
}
/**
 * 参数异常
 */
export class CommonException extends BusinessException {
  constructor(message = '', detail = '') {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, detail)
  }
}
/**
 * 参数异常
 */
export class ParamException extends BusinessException {
  constructor(message = '参数错误', detail?: string) {
    super(HttpStatus.BAD_REQUEST, message, detail)
  }
}
/**
 * 权限异常
 */
export class AuthException extends BusinessException {
  constructor(message = '无权访问', detail?: string) {
    super(HttpStatus.FORBIDDEN, message, detail)
  }
}

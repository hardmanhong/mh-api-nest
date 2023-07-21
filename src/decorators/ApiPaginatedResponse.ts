import { Type as ClassType, applyDecorators } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath
} from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PaginationModel<T> {
  public readonly list: T[]

  @ApiProperty({ example: 1, description: '总条数' })
  public readonly total: number

  @ApiProperty({ example: 1, description: '页码' })
  public readonly page: number

  @ApiProperty({ example: 10, description: '每页数量' })
  public readonly pageSize: number
}
export class PaginationQuery {
  @ApiPropertyOptional({
    default: 1,
    description: '页码'
  })
  @Type(() => Number)
  public readonly page?: number

  @ApiPropertyOptional({
    default: 10,
    description: '每页数量'
  })
  @Type(() => Number)
  public readonly pageSize?: number
}

export const ApiListResponse = <Model extends ClassType<any>>(
  model: Model,
  extral?: any
) => {
  return applyDecorators(
    ApiExtraModels(model, PaginationModel),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationModel) },
          {
            properties: {
              list: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }
              },
              ...extral
            }
          }
        ]
      }
    })
  )
}
export const ApiDataResponse = <Model extends ClassType<any>>(
  model: Model | any
) => {
  const isClass = model && model instanceof Object
  const schema = {
    type: getSchemaPath(model)
  }
  if (!isClass) schema.type = model
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema
    })
  )
}

export const ApiNullResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        nullable: true
      }
    })
  )
}

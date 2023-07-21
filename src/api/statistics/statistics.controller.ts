import { Controller, Get, Query } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger'
import { ApiDataResponse } from 'src/decorators'
import {
  BusinessDto,
  InventoryDto,
  QueryBusinessDto,
  StatisticsDto
} from './statistics.dto'
import { StatisticsService } from './statistics.service'

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({ summary: '统计' })
  @ApiDataResponse(StatisticsDto)
  getStatistics() {
    return this.statisticsService.getStatistics()
  }

  @Get('business')
  @ApiOperation({ summary: '统计图' })
  @ApiDataResponse(BusinessDto)
  getBusiness(@Query() { type = 'day' }: QueryBusinessDto) {
    return this.statisticsService.getBusiness(type)
  }

  @Get('inventory')
  @ApiOperation({ summary: '库存图' })
  @ApiExtraModels(InventoryDto)
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(InventoryDto)
      }
    }
  })
  getInventory() {
    return this.statisticsService.getInventory()
  }
}

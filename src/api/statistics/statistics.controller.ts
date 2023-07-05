import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { TimeDimension } from './type';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get()
  getStatistics() {
    return this.statisticsService.getStatistics();
  }

  @Get('business')
  getBusiness(@Query('type') type: TimeDimension = 'day') {
    return this.statisticsService.getBusiness(type);
  }

  @Get('inventory')
  getInventory() {
    return this.statisticsService.getInventory();
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { TimeDimension } from './type';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('getTotalProfit')
  getTotalProfit() {
    return this.statisticsService.getTotalProfit();
  }

  @Get()
  getStatistics(@Query('type') type: TimeDimension = 'day') {
    return this.statisticsService.getStatistics(type);
  }
}

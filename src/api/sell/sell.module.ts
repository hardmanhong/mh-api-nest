import { Module } from '@nestjs/common';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sell } from './sell.entity';
import { BuyModule } from '../buy/buy.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sell]), BuyModule],
  controllers: [SellController],
  providers: [SellService],
})
export class SellModule {}

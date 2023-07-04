import { Module } from '@nestjs/common';
import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buy } from './buy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buy])],
  controllers: [BuyController],
  providers: [BuyService],
  exports: [BuyService],
})
export class BuyModule {}

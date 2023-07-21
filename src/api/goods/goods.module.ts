import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GoodsController } from './goods.controller'
import { Goods } from './goods.entity'
import { GoodsService } from './goods.service'

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService]
})
export class GoodsModule {}

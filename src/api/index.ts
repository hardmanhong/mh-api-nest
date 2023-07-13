import { AccountModule } from './account/account.module'
import { BuyModule } from './buy/buy.module'
import { CharacterModule } from './character/character.module'
import { EquipmentModule } from './equipment/equipment.module'
import { GoodsModule } from './goods/goods.module'
import { IncomeExpensesModule } from './income-expenses/income-expenses.module'
import { PetModule } from './pet/pet.module'
import { PostModule } from './post/post.module'
import { SellModule } from './sell/sell.module'
import { StatisticsModule } from './statistics/statistics.module'
import { UserModule } from './user/user.module'

export default [
  UserModule,
  GoodsModule,
  BuyModule,
  SellModule,
  StatisticsModule,
  AccountModule,
  CharacterModule,
  EquipmentModule,
  PetModule,
  IncomeExpensesModule,
  PostModule
]

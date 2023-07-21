import { IAccount } from '../account/account.interface'
import { IEquipment } from '../equipment/equipment.interface'
import { IPet } from '../pet/pet.interface'

export interface ICharacter {
  id?: number
  userId?: number
  name: string
  molding: string
  sect: string
  level: string
  remark: string
  account: IAccount
  equipment: IEquipment
  pets: IPet[]
}

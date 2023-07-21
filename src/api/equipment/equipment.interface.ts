import { ICharacter } from '../character/character.interface'

export interface IEquipment {
  id?: number
  characterID?: number
  arms?: string
  helmet?: string
  necklace?: string
  clothes?: string
  belt?: string
  shoe?: string
  ring?: string
  bracelet?: string
  earring?: string
  trimming?: string
  remark?: string
  character?: ICharacter
  createdAt?: string
  updatedAt?: string
}

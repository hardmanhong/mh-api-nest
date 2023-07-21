export type Sort = 'ASC' | 'DESC' | 'asc' | 'desc'

export class IBuy {
  id?: number
  userId?: number
  price?: number
  quantity?: number
  inventory?: number
  hasSold?: 0 | 1
  remark?: string
}

export interface ISell {
  id?: number
  buyId: number
  goodsId?: number
  price: number
  quantity: number
  profit?: number
  remark: string
}

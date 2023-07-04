export type order = 'ASC' | 'DESC' | 'asc' | 'desc';

export interface IQuery {
  goodsIds: (string | number)[];
  startAt: Date;
  endAt: Date;
  order?: {
    inventory?: order;
    hasSold?: order;
  };
}

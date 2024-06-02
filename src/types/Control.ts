import { Order } from './Order';

export interface Control {
  id: string;
  tableId: string;
  storeId: string;
  orders: Order[];
}

import { Order } from './Order';

export interface Control {
  name: string;
  tableId: string;
  storeId: string;
  orders: Order[];
}

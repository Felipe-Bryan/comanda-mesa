import { Order } from './Order';

export interface Table {
  id: string;
  name: string;
  storeId: string;
  active: boolean;
  orders: Order[];
}

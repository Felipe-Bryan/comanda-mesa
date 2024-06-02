import { Address } from './Address';
import { Category } from './Category';
import { Order } from './Order';
import { Phone } from './Phone';
import { Product } from './Product';
import { SystemUser } from './SystemUser';
import { Table } from './Table';

export interface Store {
  id: string;
  name: string;
  active: boolean;
  ownerId: string;
  logoUrl: string;
  password: string;

  users: SystemUser[];
  categories: Category[];
  tables: Table[];
  products: Product[];
  orders: Order[];
  address: Address[];
  phones: Phone[];
}

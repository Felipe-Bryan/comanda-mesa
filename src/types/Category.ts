import { Product } from './Product';

export interface Category {
  id: string;
  name: string;
  active: boolean;
  storeId: string;

  products?: Product[];
}

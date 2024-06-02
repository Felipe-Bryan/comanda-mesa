import { Additional } from './Additional';
import { Required } from './Required';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  storeId: string;
  active: boolean;
  imageUrl?: string;

  additionals: Additional[];
  requireds: Required[];
}

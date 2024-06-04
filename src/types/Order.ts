import { AdditionalSelected } from './AdditionalSelected';
import { RequiredSelected } from './RequiredSelected';

export interface Order {
  id: string;
  quantity: number;
  comment?: string;
  value: number;
  status: 'Enviado' | 'Confirmado' | 'Entregue';
  active?: boolean;
  customerId: string;

  tableId: string;
  storeId: string;
  productId: string;
  productPrice: number;
  productName: string;
  controlId?: string;

  additionalSelected?: AdditionalSelected[];
  requiredSelected?: RequiredSelected[];
}

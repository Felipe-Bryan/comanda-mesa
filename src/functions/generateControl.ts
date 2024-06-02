import { Control } from '../types/Control';
import { Order } from '../types/Order';
import { getStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { controlIdGenerate } from './controlIdGenerate';

export function generateControl() {
  const orders: Order[] = getStorageData('tableOrderInfo');

  const id = controlIdGenerate();

  orders.forEach((order) => (order.controlId = id));

  const newControl: Control = {
    id,
    tableId: getUrlValue('t'),
    storeId: getUrlValue('s'),
    orders,
  };

  console.log(newControl);
}

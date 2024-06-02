import { Order } from '../types/Order';
import { getStorageData } from '../utils/getStorageData';
import { saveToStorage } from '../utils/saveToStorage';
import { calcValues } from './calcValues';

export function removeOrderQt() {
  const orderFound: Order = getStorageData('newOrder');
  const input = <HTMLInputElement>document.getElementById('orderQt')!;
  const orderValue = document.getElementById('orderValue')!;

  if (orderFound.quantity <= 1) {
    orderFound.quantity = 1;
  } else {
    orderFound.quantity--;
  }

  input.value = String(orderFound.quantity);

  orderValue.innerText = calcValues(orderFound).toFixed(2);

  orderFound.value = calcValues(orderFound);

  saveToStorage('newOrder', orderFound);
}

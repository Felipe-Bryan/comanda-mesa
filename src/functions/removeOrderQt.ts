import { Order } from '../types/Order';
import { getSessionStorageData } from '../utils/getStorageData';
import { saveToSessionStorage } from '../utils/saveToStorage';
import { calcValues } from './calcValues';

export function removeOrderQt() {
  const orderFound: Order = getSessionStorageData('newOrder');
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

  saveToSessionStorage('newOrder', orderFound);
}

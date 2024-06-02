import { Order } from '../types/Order';
import { getStorageData } from '../utils/getStorageData';
import { saveToStorage } from '../utils/saveToStorage';
import { calcValues } from './calcValues';

export function addOrderQt() {
  const orderFound: Order = getStorageData('newOrder');
  const input = <HTMLInputElement>document.getElementById('orderQt')!;
  const orderValue = document.getElementById('orderValue')!;

  orderFound.quantity++;

  input.value = String(orderFound.quantity);

  orderValue.innerText = calcValues(orderFound).toFixed(2);

  orderFound.value = calcValues(orderFound);

  saveToStorage('newOrder', orderFound);
}

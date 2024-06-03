import { triggerAlert } from '../components/alert';
import { startMenu } from '../pages/menu/startMenu';
import { apiData } from '../service/api.service';
import { Control } from '../types/Control';
import { Order } from '../types/Order';
import { getStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';

export async function generateControl(controlId: string) {
  const orders: Order[] = getStorageData('tableOrderInfo');
  console.log('passo 1');

  const newControl: Control = {
    name: controlId,
    tableId: getUrlValue('t'),
    storeId: getUrlValue('s'),
    orders,
  };

  await new apiData().postData('control', {
    name: newControl.name,
    tableId: newControl.tableId,
    storeId: newControl.storeId,
  });

  newControl.orders.forEach(async (order) => {
    await new apiData().putData('order', order.id, {
      controlId: newControl.name,
    });
  });

  console.log('passo 2');
  triggerAlert('Comanda Finalizada!', 'success');

  console.log('passo 3');
  startMenu();
}

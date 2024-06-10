import { triggerAlert } from '../components/alert';
import { startMenu } from '../pages/menu/startMenu';
import { apiData } from '../service/api.service';
import { Control } from '../types/Control';
import { Order } from '../types/Order';
import { getSessionStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { saveToSessionStorage } from '../utils/saveToStorage';
import { controlIdGenerate } from './controlIdGenerate';

export async function generateControl(controlId: string) {
  let confirmation = confirm('Deseja realmente finalizar a comanda');

  if (confirmation) {
    const orders: Order[] = getSessionStorageData('tableOrderInfo');

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

    triggerAlert(`Comanda ${controlId} fechada!`, 'success');

    saveToSessionStorage('controlId', controlIdGenerate());

    startMenu();
  } else {
    return;
  }
}

import { triggerAlert } from '../components/alert';
import { startConsumption } from '../pages/consumption/startConsumption';
import { apiData } from '../service/api.service';
import { Control } from '../types/Control';
import { Order } from '../types/Order';
import { getStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { controlIdGenerate } from './controlIdGenerate';

export async function generateControl() {
  const orders: Order[] = getStorageData('tableOrderInfo');

  const newControl: Control = {
    id: controlIdGenerate(),
    tableId: getUrlValue('t'),
    storeId: getUrlValue('s'),
    orders,
  };

  console.log(newControl);

  await new apiData()
    .postData('control', {
      id: newControl.id,
      tableId: newControl.tableId,
      storeId: newControl.storeId,
    })
    .then((data) => {
      newControl.orders.forEach(async (order) => {
        await new apiData().putData('order', order.id, {
          controlId: newControl.id,
        });
      });

      return data;
    })
    .then((data) => {
      triggerAlert(data.msg, 'success');

      startConsumption();
    });
}

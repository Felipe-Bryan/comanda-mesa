import { AdditionalSelected } from '../types/AdditionalSelected';
import { RequiredSelected } from '../types/RequiredSelected';
import { Table } from '../types/Table';
import { getSessionStorageData } from '../utils/getStorageData';
import { saveToSessionStorage } from '../utils/saveToStorage';
import { apiData } from './api.service';

export async function updateTableInfo(id: string) {
  Promise.all([
    await new apiData().getData('table', id).then((data) => {
      saveToSessionStorage('tableInfo', data);
    }),

    await new apiData()
      .getData('order/table', id)
      .then((data) => {
        saveToSessionStorage('tableOrderInfo', data);
      })
      .then(async () => {
        await new apiData()
          .getData('additional-selected/table', id)
          .then((data) => {
            saveToSessionStorage('tableAdditionalInfo', data);
          })
          .then(async () => {
            await new apiData().getData('required-selected/table', id).then((data) => {
              saveToSessionStorage('tableRequiredInfo', data);
            });
          });
      }),
  ]).then(() => {
    const table: Table = getSessionStorageData('tableInfo');
    table.orders = getSessionStorageData('tableOrderInfo');

    const additionalSelecteds = getSessionStorageData('tableAdditionalInfo');

    const requiredSelecteds = getSessionStorageData('tableRequiredInfo');

    table.orders.forEach((order) => {
      order.additionalSelected = [];

      additionalSelecteds.forEach((additional: AdditionalSelected) => {
        if (additional.orderId === order.id) {
          order.additionalSelected?.push(additional);
        }
      });
    });

    table.orders.forEach((order) => {
      order.requiredSelected = [];

      requiredSelecteds.forEach((required: RequiredSelected) => {
        if (required.orderId === order.id) {
          order.requiredSelected?.push(required);
        }
      });
    });

    saveToSessionStorage('tableOrderInfo', table.orders);
  });
}

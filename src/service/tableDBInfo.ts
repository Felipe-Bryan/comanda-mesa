import { AdditionalSelected } from '../types/AdditionalSelected';
import { RequiredSelected } from '../types/RequiredSelected';
import { Table } from '../types/Table';
import { getStorageData } from '../utils/getStorageData';
import { saveToStorage } from '../utils/saveToStorage';
import { apiData } from './api.service';

export async function updateTableInfo(id: string) {
  Promise.all([
    await new apiData().getData('table', id).then((data) => {
      saveToStorage('tableInfo', data);
    }),

    await new apiData()
      .getData('order/table', id)
      .then((data) => {
        saveToStorage('tableOrderInfo', data);
      })
      .then(async () => {
        await new apiData()
          .getData('additional-selected/table', id)
          .then((data) => {
            saveToStorage('tableAdditionalInfo', data);
          })
          .then(async () => {
            await new apiData().getData('required-selected/table', id).then((data) => {
              saveToStorage('tableRequiredInfo', data);
            });
          });
      }),
  ]).then(() => {
    const table: Table = getStorageData('tableInfo');
    table.orders = getStorageData('tableOrderInfo');

    const additionalSelecteds = getStorageData('tableAdditionalInfo');

    const requiredSelecteds = getStorageData('tableRequiredInfo');

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

    saveToStorage('tableOrderInfo', table.orders);
  });
}

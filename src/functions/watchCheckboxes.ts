import { AdditionalSelected } from '../types/AdditionalSelected';
import { Order } from '../types/Order';
import { getSessionStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { saveToSessionStorage } from '../utils/saveToStorage';
import { calcValues } from './calcValues';

export function watchCheckboxes() {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.additional');
  const orderValue = document.getElementById('orderValue')!;

  const orderFound: Order = getSessionStorageData('newOrder');

  let modifiedOrder: Order = {
    ...orderFound,
    additionalSelected: [],
  };

  saveToSessionStorage('newOrder', modifiedOrder);

  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      modifiedOrder = getSessionStorageData('newOrder');

      const additionalItem: AdditionalSelected = {
        id: input.id,
        name: input.title,
        price: Number(input.value),
        orderId: orderFound.id,
        storeId: getUrlValue('s'),
        tableId: getUrlValue('t'),
      };
      if (input.checked) {
        modifiedOrder.additionalSelected?.push(additionalItem);

        orderValue.innerText = calcValues(modifiedOrder).toFixed(2);
        modifiedOrder.value = calcValues(modifiedOrder);

        saveToSessionStorage('newOrder', modifiedOrder);
      } else {
        const indexOfAdd = modifiedOrder.additionalSelected?.findIndex((item) => {
          return item.id === additionalItem.id;
        });

        if (indexOfAdd !== undefined) {
          if (modifiedOrder.additionalSelected) {
            if (modifiedOrder.additionalSelected.length > 1) {
              modifiedOrder.additionalSelected?.splice(indexOfAdd, 1);
            } else {
              modifiedOrder.additionalSelected = [];
            }
          }
        }

        orderValue.innerText = calcValues(modifiedOrder).toFixed(2);
        modifiedOrder.value = calcValues(modifiedOrder);

        saveToSessionStorage('newOrder', modifiedOrder);
      }
    });
  });
}

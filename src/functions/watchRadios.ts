import { Order } from '../types/Order';
import { Product } from '../types/Product';
import { RequiredSelected } from '../types/RequiredSelected';
import { getStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { saveToStorage } from '../utils/saveToStorage';
import { calcValues } from './calcValues';

export function watchRadios(products: Product[]) {
  const orderFound: Order = getStorageData('newOrder');

  const orderValue = document.getElementById('orderValue')!;

  let modifiedOrder: Order = { ...orderFound, requiredSelected: [] };

  saveToStorage('newOrder', modifiedOrder);

  const product = products.find((item) => item.id === orderFound.productId);

  if (product && product.requireds) {
    for (let i = 0; i < product.requireds.length; i++) {
      const blankItem: RequiredSelected = {
        id: `${i}`,
        name: '',
        price: 0,
        orderId: '',
        storeId: '',
        tableId: '',
      };

      modifiedOrder.requiredSelected?.push(blankItem);

      saveToStorage('newOrder', modifiedOrder);
    }

    for (let i = 0; i < product.requireds.length; i++) {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(`.required${i}`)!;

      inputs.forEach((input) => {
        input.addEventListener('change', () => {
          let updateOrderFound: Order = getStorageData('newOrder');

          if (input.checked) {
            document.querySelectorAll(`.required${i}`)!.forEach((input) => {
              input.classList.remove('is-invalid');
            });

            const newRequiredItem: RequiredSelected = {
              id: input.id,
              name: input.title,
              price: Number(input.value),
              orderId: orderFound.id,
              storeId: getUrlValue('s'),
              tableId: getUrlValue('t'),
            };

            if (updateOrderFound.requiredSelected !== undefined) {
              updateOrderFound.requiredSelected[i] = newRequiredItem;
            }

            orderValue.innerText = calcValues(updateOrderFound).toFixed(2);
            updateOrderFound.value = calcValues(updateOrderFound);

            saveToStorage('newOrder', updateOrderFound);
          }
        });
      });
    }
  }

  if (orderFound.requiredSelected) {
  }
}

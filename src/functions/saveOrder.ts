import { triggerAlert } from '../components/alert';
import { apiData } from '../service/api.service';
import { Order } from '../types/Order';
import { closeModal } from '../utils/closeModal';
import { getStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';

export async function saveOrder() {
  const orderFound: Order = getStorageData('newOrder');

  if (orderFound.requiredSelected) {
    if (orderFound.requiredSelected.length > 0) {
      for (let i = 0; i < orderFound.requiredSelected.length; i++) {
        if (orderFound.requiredSelected[i].id === `${i}`) {
          document.querySelectorAll(`.required${i}`)!.forEach((input) => {
            input.classList.add('is-invalid');
          });

          return;
        }
      }
    }
  }

  const orderToDb: Order = {
    id: orderFound.id,
    tableId: getUrlValue('t'),
    storeId: getUrlValue('s'),
    productId: orderFound.productId,
    productPrice: orderFound.productPrice,
    productName: orderFound.productName,
    quantity: orderFound.quantity,
    value: orderFound.value,
    status: orderFound.status,
  };

  const comment = <HTMLInputElement>document.getElementById('comment')!;

  if (comment.value) {
    orderToDb.comment = comment.value;
  }

  if (orderFound.additionalSelected) {
    if (orderFound.additionalSelected.length > 0) {
      orderFound.additionalSelected.forEach(async (additional) => {
        await new apiData().postData('additional-selected', additional).then((data) => {
          console.log(data);
        });
      });
    }
  }

  if (orderFound.requiredSelected) {
    if (orderFound.requiredSelected.length > 0) {
      orderFound.requiredSelected.forEach(async (required) => {
        await new apiData().postData('required-selected', required).then((data) => {
          console.log(data);
        });
      });
    }
  }

  await new apiData().postData('order', orderToDb).then((data) => {
    console.log(data);

    closeModal();

    triggerAlert(data.msg, 'success');
  });
}

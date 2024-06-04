import { triggerAlert } from '../components/alert';
import { apiData } from '../service/api.service';
import { Order } from '../types/Order';
import { getStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { saveToStorage } from '../utils/saveToStorage';
import { toggleModal } from '../utils/toggleModal';

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

  const customerNameIpt = <HTMLInputElement>document.getElementById('customerName')!;

  customerNameIpt.addEventListener('change', () => {
    customerNameIpt.classList.remove('is-invalid');
  });

  if (customerNameIpt.value == '' || customerNameIpt.value.length < 2) {
    customerNameIpt.classList.add('is-invalid');

    triggerAlert('Nome deve conter mais de 2 letras', 'danger');

    return;
  } else {
    saveToStorage('customerName', customerNameIpt.value);
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
    customerId: customerNameIpt.value,
  };

  const comment = <HTMLInputElement>document.getElementById('comment')!;

  if (comment.value) {
    orderToDb.comment = comment.value;
  }

  if (orderFound.additionalSelected) {
    if (orderFound.additionalSelected.length > 0) {
      orderFound.additionalSelected.forEach(async (additional) => {
        await new apiData().postData('additional-selected', additional);
      });
    }
  }

  if (orderFound.requiredSelected) {
    if (orderFound.requiredSelected.length > 0) {
      orderFound.requiredSelected.forEach(async (required) => {
        await new apiData().postData('required-selected', required);
      });
    }
  }

  await new apiData().postData('order', orderToDb).then((data) => {
    toggleModal();

    triggerAlert(data.msg, 'success', 4000);
  });
}

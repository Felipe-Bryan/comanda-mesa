import { triggerAlert } from '../components/alert';
import { alertModal } from '../components/alertModal';
import { apiData } from '../service/api.service';
import { Order } from '../types/Order';
import { getSessionStorageData } from '../utils/getStorageData';
import { getUrlValue } from '../utils/getUrlValue';
import { saveToStorage } from '../utils/saveToStorage';
import { toggleModal2 } from '../utils/toggleModal';

export async function saveOrder() {
  const orderFound: Order = getSessionStorageData('newOrder');

  if (orderFound.requiredSelected) {
    if (orderFound.requiredSelected.length > 0) {
      for (let i = 0; i < orderFound.requiredSelected.length; i++) {
        if (orderFound.requiredSelected[i].id === `${i}`) {
          const requiredInputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll(`.required${i}`)!;

          requiredInputs.forEach((input) => {
            input.classList.add('is-invalid');

            input.focus();
          });

          triggerAlert('Deve selecionar um item obrigatório!', 'danger', 10000);

          alertModal('Atenção!', 'Deve selecionar um dos itens obrigatórios!', false);

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

    triggerAlert('Por favor informe seu nome', 'danger', 10000);

    customerNameIpt.addEventListener('change', () => {
      customerNameIpt.classList.remove('is-invalid');
    });

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

  alertModal('Enviando pedido', 'Aguarde...', false);

  await new apiData().postData('order', orderToDb).then((data) => {
    toggleModal2();

    triggerAlert(data.msg, 'success', 4000);
  });
}

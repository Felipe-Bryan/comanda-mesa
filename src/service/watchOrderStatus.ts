import { triggerAlert } from '../components/alert';
import { renderTableItems } from '../pages/consumption/renderTableItems';
import { Order } from '../types/Order';
import { getSessionStorageData } from '../utils/getStorageData';
import { saveToSessionStorage } from '../utils/saveToStorage';
import { updateTableInfo } from './tableDBInfo';

export function watchOrderStatus(tableId: string) {
  Promise.all([updateTableInfo(tableId)]).then(() => {
    const tableOrders: Order[] = getSessionStorageData('tableOrderInfo');

    const activeOrders = tableOrders.filter((order) => order.active === true);

    const storedInfo = getSessionStorageData('tableActiveOrders');

    if (storedInfo > activeOrders.length) {
      saveToSessionStorage('tableActiveOrders', activeOrders.length);

      renderTableItems();
    } else if (storedInfo <= activeOrders.length) {
      saveToSessionStorage('tableActiveOrders', activeOrders.length);
    }

    tableOrders.forEach((order) => {
      const monitored: string = getSessionStorageData(`${order.id}`);

      if (order.status === 'Enviado') {
        saveToSessionStorage(`${order.id}`, order.status);
      } else if (order.status === 'Confirmado' && monitored === 'Enviado') {
        triggerAlert(`${order.productName} confirmado`, 'primary', 'top', 4000);

        renderTableItems();

        saveToSessionStorage(`${order.id}`, order.status);
      } else if (order.status === 'Entregue' && monitored === 'Confirmado') {
        renderTableItems();
        saveToSessionStorage(`${order.id}`, order.status);
      }
    });
  });
}

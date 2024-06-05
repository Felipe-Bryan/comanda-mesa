import { tableOrderItem } from '../../components/tableOrderItem';
import { generateControl } from '../../functions/generateControl';
import { Table } from '../../types/Table';
import { getStorageData } from '../../utils/getStorageData';

export function renderTableItems() {
  const table: Table = getStorageData('tableInfo');
  table.orders = getStorageData('tableOrderInfo');

  document.getElementById('tableContent')!.innerHTML = '';

  if (table && table.orders) {
    let totalValue = 0;

    const totalValueSpot = document.getElementById('totalValue')!;

    table.orders.forEach((order) => {
      totalValue += order.value;

      tableOrderItem(order);
    });

    totalValueSpot.innerHTML = `R$ ${totalValue.toFixed(2)}`;

    if (table.orders.length > 0) {
      const controlId = getStorageData('controlId');

      document.getElementById('setControlSpot')!.innerHTML = `
        <button class="btn btn-info" type="button" id="setControlBtn">Finalizar Comanda</button>`;

      // atribuir click ao botão setControlBtn
      document.getElementById('setControlBtn')!.addEventListener('click', (e) => {
        e.preventDefault();

        generateControl(controlId);
      });
    } else {
      document.getElementById('setControlSpot')!.innerHTML = ``;
    }
  }
}

import { alertModal } from '../../components/alertModal';
import { tableOrderItem } from '../../components/tableOrderItem';
import { generateControl } from '../../functions/generateControl';
import { Table } from '../../types/Table';
import { getSessionStorageData } from '../../utils/getStorageData';

export function renderTableItems() {
  const table: Table = getSessionStorageData('tableInfo');
  table.orders = getSessionStorageData('tableOrderInfo');

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
      const controlId = getSessionStorageData('controlId');

      document.getElementById('setControlSpot')!.innerHTML = `
        <button class="btn btn-info" type="button" id="setControlBtn" data-bs-toggle="modal" data-bs-target="#modal2">Finalizar Comanda</button>`;

      // atribuir click ao botão setControlBtn
      document.getElementById('setControlBtn')!.addEventListener('click', (e) => {
        e.preventDefault();

        alertModal('Finalizar Comanda', 'Deseja realmente finalizar a comanda?', true);

        const confirmBtn = document.getElementById('finishModal2')!;
        confirmBtn.addEventListener('click', () => {
          generateControl(controlId);
        });
      });
    } else {
      document.getElementById('setControlSpot')!.innerHTML = ``;
    }
  }
}

import { tableOrderItem } from '../../components/tableOrderItem';
import { controlIdGenerate } from '../../functions/controlIdGenerate';
import { generateControl } from '../../functions/generateControl';
import { tableDBInfo } from '../../service/tableDBInfo';
import { AdditionalSelected } from '../../types/AdditionalSelected';
import { RequiredSelected } from '../../types/RequiredSelected';
import { Table } from '../../types/Table';
import { componentVisibility } from '../../utils/componentVisibility';
import { getStorageData } from '../../utils/getStorageData';
import { getUrlValue } from '../../utils/getUrlValue';
import { saveToStorage } from '../../utils/saveToStorage';

export function startConsumption() {
  componentVisibility('btnHelp', 'hide');
  componentVisibility('help', 'hide');
  componentVisibility('categoryNav', 'hide');
  componentVisibility('productsMenu', 'hide');
  componentVisibility('loading', 'show');
  componentVisibility('tableConsumption', 'hide');
  componentVisibility('tableFoot', 'hide');

  document.getElementById('setControlSpot')!.innerHTML = `
  <button class="btn btn-info" type="button" id="setControlBtn">Finalizar Comanda</button>`;

  window.scrollTo(0, 0);

  Promise.all([tableDBInfo(getUrlValue('t'))]).then(() => {
    componentVisibility('loading', 'hide');
    componentVisibility('tableConsumption', 'show');
    componentVisibility('tableFoot', 'show');

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

    document.getElementById('tableContent')!.innerHTML = '';

    if (table && table.orders) {
      let totalValue = 0;

      const totalValueSpot = document.getElementById('totalValue')!;

      table.orders.forEach((order) => {
        totalValue += order.value;

        tableOrderItem(order);
      });

      totalValueSpot.innerHTML = `R$ ${totalValue.toFixed(2)}`;
    }

    const controlId = getStorageData('controlId');

    // atribuir click ao botão setControlBtn
    document.getElementById('setControlBtn')!.addEventListener('click', (e) => {
      e.preventDefault();

      generateControl(controlId);
    });
  });
}

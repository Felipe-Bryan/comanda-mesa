import { setNavBtnActive } from '../../functions/setNavBtnActive';
import { updateTableInfo } from '../../service/tableDBInfo';
import { componentVisibility } from '../../utils/componentVisibility';
import { getUrlValue } from '../../utils/getUrlValue';
import { renderTableItems } from './renderTableItems';

export function startConsumption() {
  componentVisibility('btnHelp', 'hide');
  componentVisibility('help', 'hide');
  componentVisibility('categoryNav', 'hide');
  componentVisibility('productsMenu', 'hide');
  componentVisibility('loading', 'show');
  componentVisibility('tableConsumption', 'hide');
  componentVisibility('tableFoot', 'hide');

  setNavBtnActive('btnViewConsumption', true);
  setNavBtnActive('btnViewMenu', false);

  window.scrollTo(0, 0);

  Promise.all([updateTableInfo(getUrlValue('t'))]).then(() => {
    componentVisibility('loading', 'hide');
    componentVisibility('tableConsumption', 'show');
    componentVisibility('tableFoot', 'show');

    renderTableItems();

    // const additionalSelecteds = getStorageData('tableAdditionalInfo');

    // const requiredSelecteds = getStorageData('tableRequiredInfo');

    // table.orders.forEach((order) => {
    //   order.additionalSelected = [];

    //   additionalSelecteds.forEach((additional: AdditionalSelected) => {
    //     if (additional.orderId === order.id) {
    //       order.additionalSelected?.push(additional);
    //     }
    //   });
    // });

    // table.orders.forEach((order) => {
    //   order.requiredSelected = [];

    //   requiredSelecteds.forEach((required: RequiredSelected) => {
    //     if (required.orderId === order.id) {
    //       order.requiredSelected?.push(required);
    //     }
    //   });
    // });

    // saveToStorage('tableOrderInfo', table.orders);
  });
}

import { controlIdGenerate } from '../../functions/controlIdGenerate';
import { setClickNavButtons } from '../../functions/setClickNavButtons';
import { watchOrderStatus } from '../../service/watchOrderStatus';
import { Additional } from '../../types/Additional';
import { Required, RequiredItem } from '../../types/Required';
import { Store } from '../../types/Store';
import { componentVisibility } from '../../utils/componentVisibility';
import { getSessionStorageData } from '../../utils/getStorageData';
import { getUrlValue } from '../../utils/getUrlValue';
import { saveToSessionStorage } from '../../utils/saveToStorage';
import { startMenu } from '../menu/startMenu';
import { defineStoreInfo } from './defineStoreInfo';

export function startApp() {
  const store: Store = getSessionStorageData('storeInfo');
  store.categories = getSessionStorageData('categoryInfo');
  store.products = getSessionStorageData('productInfo');

  const additionals = getSessionStorageData('additionalInfo');
  const required = getSessionStorageData('requiredInfo');
  const requiredItems = getSessionStorageData('requiredItemInfo');

  store.products.forEach((product) => {
    product.additionals = additionals.filter((additional: Additional) => additional.productId === product.id);
  });

  store.products.forEach((product) => {
    product.requireds = required.filter((required: Required) => required.productId === product.id);
  });

  store.products.forEach((product) => {
    product.requireds.forEach((required) => {
      required.items = requiredItems.filter((requiredItem: RequiredItem) => requiredItem.requiredId === required.id);
    });
  });

  saveToSessionStorage('storeInfo', store);

  saveToSessionStorage('controlId', controlIdGenerate());

  defineStoreInfo(store);
  setClickNavButtons();
  componentVisibility('loading', 'hide');
  componentVisibility('storeInfo', 'show');
  componentVisibility('mainNav', 'show');
  componentVisibility('placeLogo', 'show');
  componentVisibility('storeName', 'show');

  setInterval(() => {
    watchOrderStatus(getUrlValue('t'));
  }, 5000);

  startMenu();
}

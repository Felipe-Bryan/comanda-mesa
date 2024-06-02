import { setClickNavButtons } from '../../functions/setClickNavButtons';
import { Additional } from '../../types/Additional';
import { Required, RequiredItem } from '../../types/Required';
import { Store } from '../../types/Store';
import { componentVisibility } from '../../utils/componentVisibility';
import { getStorageData } from '../../utils/getStorageData';
import { saveToStorage } from '../../utils/saveToStorage';
import { startMenu } from '../menu/startMenu';
import { defineStoreInfo } from './defineStoreInfo';

export function startApp() {
  const store: Store = getStorageData('storeInfo');
  store.categories = getStorageData('categoryInfo');
  store.products = getStorageData('productInfo');

  const additionals = getStorageData('additionalInfo');
  const required = getStorageData('requiredInfo');
  const requiredItems = getStorageData('requiredItemInfo');

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

  saveToStorage('storeInfo', store);

  defineStoreInfo(store);
  setClickNavButtons();
  componentVisibility('loading', 'hide');
  componentVisibility('storeInfo', 'show');
  componentVisibility('mainNav', 'show');
  componentVisibility('placeLogo', 'show');
  componentVisibility('storeName', 'show');

  startMenu();
}

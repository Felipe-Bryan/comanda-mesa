import { saveToSessionStorage } from '../utils/saveToStorage';
import { apiData } from './api.service';

export async function getCustomerData(id: string) {
  Promise.all([
    await new apiData().getData('store', id).then((data) => {
      saveToSessionStorage('storeInfo', data);
    }),

    await new apiData().getData('category/store', id).then((data) => {
      saveToSessionStorage('categoryInfo', data);
    }),

    await new apiData().getData('product/store', id).then((data) => {
      saveToSessionStorage('productInfo', data);
    }),

    await new apiData().getData('additional/store', id).then((data) => {
      saveToSessionStorage('additionalInfo', data);
    }),

    await new apiData().getData('required/store', id).then((data) => {
      saveToSessionStorage('requiredInfo', data);
    }),

    await new apiData().getData('required-item/store', id).then((data) => {
      saveToSessionStorage('requiredItemInfo', data);
    }),
  ]).then(() => {
    return true;
  });
}
